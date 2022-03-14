<template>
    <AddTask v-if="showAddTask" @add-task="addTask" />
    <Tasks @toggle-reminder="toggleReminder" @delete-task="deleteTask" :tasks="tasks" />
</template>

<script>
import Tasks from '../components/Tasks.vue'
import AddTask from '../components/AddTask.vue'

export default {
    name: 'Home',
    props: {
        showAddTask: Boolean,
    },
    components: {
        Tasks,
        AddTask
    },
    data(){
        return {
            tasks: [],
        }
        
    },
    methods: {
        // Create
        async addTask(task){
        const res = await fetch('http://localhost:5000/tasks', {
            method: 'POST',
            headers: {
            'Content-type': 'application/json',
            },
            body: JSON.stringify(task),
        })

        const data = await res.json()

        this.tasks = [...this.tasks, data]
        },

        // Delete
        async deleteTask(id){
        if (confirm("Are you sure?")) {
            const res = await fetch(`http://localhost:5000/tasks/${id}`, {
            method: 'DELETE',
            })

            res.status === 200 ? (this.tasks = this.tasks.filter((task) => task.id !== id)) : alert("Error Deleting Task")
        }
        },

        // Update
        async toggleReminder(id){
        const taskToToggle = await this.fetchTask(id)
        const updTask = {...taskToToggle, reminder: !taskToToggle.reminder}

        const res = await fetch(`http://localhost:5000/tasks/${id}`, {
            method: 'PUT',
            headers: {
            'Content-type': 'application/json'
            },
            body: JSON.stringify(updTask)
        })

        const data = await res.json()

        this.tasks = this.tasks.map((task) => task.id === id ? {
            ...task, reminder: data.reminder} : task
        )
        },
        
        // Read
        async fetchTasks() {
        const res = await fetch('http://localhost:5000/tasks') // data berasal dari sini

        const data = await res.json()

        return data
        },
        // Read by ID
        async fetchTask(id) {
        const res = await fetch(`http://localhost:5000/tasks/${id}`)

        const data = await res.json()

        return data
        },
    },
    async created(){
        this.tasks = await this.fetchTasks()
    },
}
</script>