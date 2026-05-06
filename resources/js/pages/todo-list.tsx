import { Head } from "@inertiajs/react";
import { Menu } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";


interface Props { 
    tasks: {
        id: number,
        name: string,
        description: string,
        checked: boolean,
        user_id: number,
    }[] 
};

export default function TodoList({ tasks: initialTasks }: Props) {
    const [tasks, setTasks] = useState(initialTasks);
    const [editingTask, setEditingTask] = useState<null | {
        id: number,
        name: string,
        description: string,
        checked: boolean,
        user_id: number,
    }>(null);

    return (
        <main>
            <Head title="Todo List" />
            <div className="max-w-2xl mx-auto flex flex-col gap-4">
                <div className="flex justify-between">
                    <h1 className="text-2xl font-semibold">Your Todo List</h1>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button className="text-sm">Add Task</Button>
                        </DialogTrigger>
                        <DialogContent>
                            <form method="POST" action="/task">
                                <DialogHeader>
                                    <DialogTitle>Add Task</DialogTitle>
                                    <DialogDescription>
                                        Add a new task to your todo list.
                                    </DialogDescription>
                                </DialogHeader>
                                <FieldGroup className="py-2">
                                    <Field>
                                        <Label htmlFor="name">Name</Label>
                                        <Input id="name" name="name" placeholder="Enter a task name" />
                                    </Field>
                                    <Field>
                                        <Label htmlFor="description">Description</Label>
                                        <Input id="description" name="description" placeholder="Enter a task description" />
                                    </Field>
                                </FieldGroup>
                                <DialogFooter>
                                    <DialogClose asChild>
                                        <Button variant="ghost">Cancel</Button>
                                    </DialogClose>
                                    <Button type="submit">Add Task</Button>
                                </DialogFooter>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>
                {tasks.map((task) => (
                <div
                    key={`task-${task.id}`}
                    className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm"
                >
                    <label
                    htmlFor={`task-${task.id}-checked`}
                    className="flex cursor-pointer items-start justify-between gap-4"
                    >
                    <div className="flex justify-between items-center w-full">
                        <div className="flex items-center gap-3">
                            <input
                            id={`task-${task.id}-checked`}
                            type="checkbox"
                            checked={task.checked}
                            onChange={() => {
                                setTasks(previous => previous.map(t => t.id === task.id ? { ...t, checked: !t.checked } : t));
                                fetch(`/task/${task.id}`, {
                                    method: 'PATCH',
                                    body: JSON.stringify({ checked: !task.checked }),
                                    headers: {
                                        'Content-Type': 'application/json',
                                    },
                                    credentials: 'include'
                                }).then(response => {
                                    console.log(response.status)
                                })
                            }}
                            readOnly
                            className="mt-1 h-5 w-5 appearance-none rounded border border-slate-300 bg-white 
                                        checked:border-emerald-600 checked:bg-emerald-600 
                                        focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                            />

                            <div className="min-w-0">
                                <span
                                    id={`task-${task.id}-name`}
                                    className="block text-base font-semibold text-slate-900"
                                >
                                    {task.name}
                                </span>

                                <span
                                    id={`task-${task.id}-description`}
                                    className="mt-1 block text-sm leading-relaxed text-slate-600"
                                >
                                    {task.description}
                                </span>
                            </div>
                        </div>
                        <div>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button size="icon" variant="ghost">
                                        <Menu />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuGroup className="flex flex-col gap-1">
                                        <DropdownMenuLabel asChild>
                                            <Dialog>
                                                <DialogTrigger asChild>
                                                    <Button variant="ghost" className="justify-start" onClick={() => {
                                                        setEditingTask(task);
                                                    }}>Edit Task</Button>
                                                </DialogTrigger>
                                                <DialogContent>
                                                    <form method="PATCH" action={`/task/${task.id}`}>
                                                        <DialogHeader>
                                                            <DialogTitle>Edit Task</DialogTitle>
                                                            <DialogDescription>
                                                                Edit the task name and description.
                                                            </DialogDescription>
                                                        </DialogHeader>
                                                        <FieldGroup className="py-2">
                                                            <Field>
                                                                <Label htmlFor="name">Name</Label>
                                                                <Input id="name" name="name" value={editingTask?.name} onChange={(e) => {
                                                                    setEditingTask(previous => (previous ? {
                                                                        ...previous,
                                                                        name: e.target.value
                                                                    } : null));
                                                                }} placeholder="Enter a task name" />
                                                            </Field>
                                                            <Field>
                                                                <Label htmlFor="description">Description</Label>
                                                                <Input id="description" name="description" value={editingTask?.description} onChange={(e) => {
                                                                    setEditingTask(previous => (previous ? {
                                                                        ...previous,
                                                                        description: e.target.value
                                                                    }: previous));
                                                                }} placeholder="Enter a task description" />
                                                            </Field>
                                                        </FieldGroup>
                                                        <DialogFooter>
                                                            <DialogClose asChild>
                                                                <Button variant="ghost">Cancel</Button>
                                                            </DialogClose>
                                                            <Button type="submit">Save</Button>
                                                        </DialogFooter>
                                                    </form>
                                                </DialogContent>
                                            </Dialog>
                                        </DropdownMenuLabel>
                                        <Separator />
                                        <DropdownMenuLabel asChild>
                                            <Dialog>
                                                <DialogTrigger asChild>
                                                    <Button variant="ghost" className="justify-start">Delete Task</Button>
                                                </DialogTrigger>
                                                <DialogContent>
                                                    <form method="DELETE" action={`/task/${task.id}`}>
                                                        <DialogHeader>
                                                            <DialogTitle>Delete Task</DialogTitle>
                                                            <DialogDescription>
                                                                Are you sure you want to delete this task?
                                                            </DialogDescription>
                                                        </DialogHeader>
                                                        <DialogFooter>
                                                            <DialogClose asChild>
                                                                <Button variant="ghost">Cancel</Button>
                                                            </DialogClose>
                                                            <Button variant={"destructive"} type="submit">Delete</Button>
                                                        </DialogFooter>
                                                    </form>
                                                </DialogContent>
                                            </Dialog>
                                        </DropdownMenuLabel>
                                    </DropdownMenuGroup>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>

                    {/* Optional: visually match the checked state with icon-like styling */}
                    <span className="sr-only">
                        {task.checked ? "Checked" : "Not checked"}
                    </span>
                    </label>
                </div>
                ))}
                </div>
        </main>
    )
}