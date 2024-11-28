import {
  addTaskAC, changeTaskAC,
  removeTaskAC,
  tasksReducer,
  TasksStateType
} from "../tasks-reducer"
import { addTodolistAC, removeTodolistAC } from "../todolists-reducer"
import {TaskPriority, TaskStatus} from "../../lib/enums";

let startState: TasksStateType
beforeEach(() => {
  startState = {
    todolistId1: [
      { id: "1", title: "CSS", status: TaskStatus.New, addedDate: '', todoListId: "todolistId1", order: 7, deadline: '', startDate: '', description: '', priority: TaskPriority.Low },
      { id: "2", title: "JS", status: TaskStatus.New, addedDate: '', todoListId: "todolistId1", order: 7, deadline: '', startDate: '', description: '', priority: TaskPriority.Low },
      { id: "3", title: "React", status: TaskStatus.New, addedDate: '', todoListId: "todolistId1", order: 7, deadline: '', startDate: '', description: '', priority: TaskPriority.Low },
    ],
    todolistId2: [
      { id: "1", title: "bread", status: TaskStatus.New, addedDate: '', todoListId: 'todolistId2', order: 7, deadline: '', startDate: '', description: '', priority: TaskPriority.Low },
      { id: "2", title: "milk", status: TaskStatus.New, addedDate: '', todoListId: 'todolistId2', order: 7, deadline: '', startDate: '', description: '', priority: TaskPriority.Low },
      { id: "3", title: "tea", status: TaskStatus.New, addedDate: '', todoListId: 'todolistId2', order: 7, deadline: '', startDate: '', description: '', priority: TaskPriority.Low },
    ],
  }
})

test("correct task should be deleted from correct array", () => {
  const endState = tasksReducer(startState, removeTaskAC({todolistId:"todolistId2", taskId:"2"}))

  expect(endState).toEqual({
    todolistId1: [
      { id: "1", title: "CSS", status: 0, addedDate: '', todoListId: 'todolistId1', order: 7, deadline: '', startDate: '', description: '', priority: TaskPriority.Low },
      { id: "2", title: "JS", status: 0, addedDate: '', todoListId: 'todolistId1', order: 7, deadline: '', startDate: '', description: '', priority: TaskPriority.Low },
      { id: "3", title: "React", status: 0, addedDate: '', todoListId: 'todolistId1', order: 7, deadline: '', startDate: '', description: '', priority: TaskPriority.Low },
    ],
    todolistId2: [
      { id: "1", title: "bread", status: 0, addedDate: '', todoListId: 'todolistId2', order: 7, deadline: '', startDate: '', description: '', priority: TaskPriority.Low },
      { id: "3", title: "tea", status: 0, addedDate: '', todoListId: 'todolistId2', order: 7, deadline: '', startDate: '', description: '', priority: TaskPriority.Low },
    ],
  }
  )
})
test("correct task should be added to correct array", () => {
  const endState = tasksReducer(startState, addTaskAC({ task:{id: "4", title: "juice", status: TaskStatus.New, addedDate: '', todoListId: 'todolistId2', order: 7, deadline: '', startDate: '', description: '', priority: TaskPriority.Low } }))

  expect(endState["todolistId1"].length).toBe(3)
  expect(endState["todolistId2"].length).toBe(4)
  expect(endState["todolistId2"][0].id).toBeDefined()
  expect(endState["todolistId2"][0].title).toBe("juice")
  expect(endState["todolistId2"][0].status).toBe(TaskStatus.New)
})
test("status of specified task should be changed", () => {
  const endState = tasksReducer(startState, changeTaskAC({ task:{ id: "2", title: "milk", status: TaskStatus.Completed, addedDate: '', todoListId: 'todolistId2', order: 7, deadline: '', startDate: '', description: '', priority: TaskPriority.Low } }))

  expect(endState["todolistId1"].length).toBe(3);
  expect(endState["todolistId1"][1].status).toBeDefined();
  expect(endState["todolistId1"][1].status).toBe(TaskStatus.New);
  expect(endState["todolistId2"].length).toBe(3);
  expect(endState["todolistId2"][1].status).toBeDefined();
  expect(endState["todolistId2"][1].status).toBe(TaskStatus.Completed);
})
/*test("current title of specified task should be updated", () => {
  let newTitle = "newTitle"
  const endState = tasksReducer(startState, changeTaskAC("todolistId1", "3", newTitle))

  expect(endState["todolistId1"][2].title).toBeDefined()
  expect(endState["todolistId1"][2].title).toBe(newTitle)
  expect(endState["todolistId2"][2].title).toBeDefined()
  expect(endState["todolistId2"][2].title).toBe("tea")
})
test("new array should be added when new todolist is added", () => {
  const endState = tasksReducer(startState, addTodolistAC("new todolist"))

  const keys = Object.keys(endState)
  const newKey = keys.find((k) => k != "todolistId1" && k != "todolistId2")
  if (!newKey) {
    throw Error("new key should be added")
  }

  expect(keys.length).toBe(3)
  expect(endState[newKey]).toEqual([])
})
test("property with todolistId should be deleted", () => {
  const endState = tasksReducer(startState, removeTodolistAC("todolistId2"))
  const keys = Object.keys(endState)

  expect(keys.length).toBe(1)
  expect(endState["todolistId2"]).toBeUndefined()
})*/
