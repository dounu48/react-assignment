import * as types from 'actions/ActionTypes';
import update from 'react-addons-update';

const initialState = {
    post: {
        status: 'INIT',
        error: -1
    },
    get: {
            status: 'INIT',
            data: [],
        },
    remove: {
            status: 'INIT',
            error: -1
        },

     edit: {
            status: 'INIT',
            error: -1,
        }
};

export default function preference(state, action) {
    if(typeof state === "undefined") {
        state = initialState;
    }

    switch(action.type) {
        case types.PREFERENCE_POST:
            return update(state, {
                post: {
                    status: { $set: 'WAITING' },
                    error: { $set: -1 }
                }
            });
        case types.PREFERENCE_POST_SUCCESS:
            return update(state, {
                post: {
                    status: { $set: 'SUCCESS' }
                }
            });
        case types.PREFERENCE_POST_FAILURE:
            return update(state, {
                post: {
                    status: { $set: 'FAILURE' },
                    error: { $set: action.error }
                }
            });
        case types.PREFERENCE_GET:
             return update(state, {
                 get: {
                     status: { $set: 'WAITING' },
                 }
             });
         case types.PREFERENCE_GET_SUCCESS:
                 return update(state, {
                     get: {
                         status: { $set: 'SUCCESS' },
                         data: { $set: action.data },
                    //     isLast: { $set: action.data.length < 6 }
                     }
                 })

             return state;
             // loading older or newer memo
             // to be implemented..
         case types.PREFERENCE_GET_FAILURE:
             return update(state, {
                 get: {
                     status: { $set: 'FAILURE' }
                 }
             });
            case types.PREFERENCE_REMOVE:
                       return update(state, {
                           remove: {
                               status: { $set: 'WAITING' },
                               error: { $set: -1 }
                           }
                       });
                   case types.PREFERENCE_REMOVE_SUCCESS:
                       return update(state, {
                           remove:{
                               status: { $set: 'SUCCESS' }
                           },
                       });
                   case types.PREFERENCE_REMOVE_FAILURE:
                       return update(state, {
                           remove: {
                               status: { $set: 'FAILURE' },
                               error: { $set: action.error }
                           }
                       });

      case types.PREFERENCE_EDIT:
                  return update(state, {
                      edit: {
                          status: { $set: 'WAITING' },
                          error: { $set: -1 },
                          preference: { $set: undefined }
                      }
                  });
              case types.PREFERENCE_EDIT_SUCCESS:
                  return update(state, {
                      edit: {
                          status: { $set: 'SUCCESS' },
                      },
                  });
              case types.PREFERENCE_EDIT_FAILURE:
                  return update(state, {
                      edit: {
                          status: { $set: 'FAILURE' },
                          error: { $set: action.error }
                      }
                  });


        default:
            return state;
    }
}
