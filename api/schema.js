import { 
  GraphQLSchema, 
  GraphQLObjectType, 
  GraphQLInt,
  GraphQLString,
  GraphQLList
} from 'graphql';

import {
  getUser
} from './database';


// make Friend into a schema Type.
const friendType = new GraphQLObjectType({
  name: "Friend",
  description: `Someone's friend`,
  fields: () => ({
    id: {
      type: GraphQLInt,
      description: `The friend identifier.`
    },
    name: {
      type: GraphQLString,
      description: `What's his name again?`,
      resolve: (friend, params) => {
        // we can do some mutation about the resolving of the name
        return friend.name;
      }
    }
})
});
  
// make User into a schema Type
var userType = new GraphQLObjectType({
  name: 'User',
  description: `One of the users who has many friends`,
  fields: () => ({
    id: {
      type: GraphQLInt,
      description: `The user identifier.`
    },
    name: {
      type: GraphQLString,
      description: `The name of the user`,
    },
    formatted: {
      type: GraphQLString,
      deprecationReason: `We don't like the formatted version anymore, it's depricated soon.`,
      description: `Show the user's id and name`,
      resolve(obj) {
        return obj.id + ': ' + obj.name
      }
    },
    friends: {
      // make sure to wrap the friendType in a List
      type: new GraphQLList(friendType)
    }
  })
});

// output our full Schema, with the User type, and how to request it with args.
// it will resolve the id requested user from our database
export const Schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      user: {
        type: userType,
        args: {
          id: {
            name: 'id',
            type: GraphQLInt
          }
        },
        resolve: (root, {id}, source) => {
          return getUser(id)
        }
      }
    }
  })
});
