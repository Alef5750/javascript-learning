const baseUrl: string = "https://66e9905787e417609449f8bc.mockapi.io/api/v1";

interface TodoI {
    userId: number;
    id: string;
    title: string;
    completed: boolean;
}

// GET ALL TODO'S
const getAll: Function = async () => {
    const response: any = await fetch(`${baseUrl}/todos`)
    const data: any = await response.json()
    console.log(data)
}

// CREATE NEW TODO
const addTodo: Function = async (newTodo: TodoI) => {
    const response: Promise<T> = await fetch(`${baseUrl}/todos`, {
    method: "POST",
    body:  JSON.stringify(newTodo)
})
}
getAll()