import { api } from './servicesConfig/api.service'

export const taskService = api.injectEndpoints({
  endpoints: (builder) => ({
    getTasks: builder.query({
      query() {
        return {
          url: 'task/getAll',
          method: 'GET'
        }
      },
    }),
    registerTask: builder.query({
      query(task) {
        return {
          url: 'task/register',
          method: 'POST',
          body: JSON.stringify({ ...task }),
        }
      },
    }),
    deleteTask: builder.query({
      query(task) {
        return {
          url: 'task/delete',
          method: 'DELETE',
          body: JSON.stringify({ ...task }),
        }
      },
    }),
  }),
})

export const {
  useGetTasksQuery,
  useLazyGetTasksQuery,
  useRegisterTaskQuery,
  useLazyRegisterTaskQuery,
  useDeleteTaskQuery,
  useLazyDeleteTaskQuery,

} = taskService
