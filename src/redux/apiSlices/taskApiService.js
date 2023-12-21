import { apiSlice } from '../../apis/apiSlice'
import { createSelector, createEntityAdapter } from '@reduxjs/toolkit'


const tasksAdapter = createEntityAdapter({})

const initialState = tasksAdapter.getInitialState()

const taskApiService = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getTasks: builder.query({
            query: () => ({
                url: '/task/getall',
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError
                }
            }),
            keepUnusedDataFor: 5,
            transformResponse: async (response, meta, args) => {
                const loadedTasks = await response.map(task => {
                    task.id = task._id
                    return task
                })
                return tasksAdapter.setAll(initialState, loadedTasks)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Tasks', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'Tasks', id }))
                    ]
                } else return [{
                    type: 'Tasks', id: 'LIST'
                }]
            }
        }),

        addTask: builder.mutation({
            query: (credentials) => ({
                url: '/task/addtask',
                method: 'POST',
                body: { ...credentials }
            }),
            invalidatesTags: ['Tasks']
        }),

        changeStatus: builder.mutation({
            query: (credentials) => ({
                url: '/task/changestatus',
                method: 'PATCH',
                body: { ...credentials }
            }),
            invalidatesTags: ['Tasks']
        }),

        deleteTask: builder.mutation({
            query: (credentials) => ({
                url: '/task/delete',
                method: 'DELETE',
                body: { ...credentials }
            }),
            invalidatesTags: ['Tasks']
        })
    })
})


export const {
    useGetTasksQuery,
    useAddTaskMutation,
    useChangeStatusMutation,
    useDeleteTaskMutation
} = taskApiService

export const selectTasksResults = taskApiService.endpoints.getTasks.select()

const selectTaskData = createSelector(
    selectTasksResults,
    taskResul => taskResul.data
)

export const {
    selectAll: selectAllTasks,
    selectById: selectTaskById,
    selectIds: selectTaskIds
} = tasksAdapter.getSelectors(state => selectTaskData(state) ?? initialState)