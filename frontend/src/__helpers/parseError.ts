import { SerializedError } from '@reduxjs/toolkit'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'

/**
 * This function will be used to verify if an error is an FetchBaseQueryError and also will return an object y the global error format
 *
 * @param {FetchBaseQueryError | SerializedError} error
 * @returns {CustomError | null}
 */

export const parseError = (error: FetchBaseQueryError | SerializedError): CustomError | null => {
  if ('data' in error && typeof error.data === 'object') {
    if(error.data && 'message' in error.data && 'name' in error.data && 'data' in error.data){
      if(typeof error.data.message === 'string' && typeof error.data.name === 'string' && typeof error.data.data === 'object'){
        return {
          name: error.data.name,
          message: error.data.message,
          data: error.data.data
        }
      }
    }
  }
  return null
}