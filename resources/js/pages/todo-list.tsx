interface Props { 
    tasks: {
        id: number,
        name: string,
        description: string,
        checked: boolean,
        user_id: number,
    }[] 
};

export default function TodoList({ tasks }: Props) {
    return (
        <div>
            {tasks.map((task) => (
                <div key={`task-${task.id}`}>
                    <span id={`task-${task.id}-name`}>{task.name}</span>
                    <span id={`task-${task.id}-description`}>{task.description}</span>
                    <span id={`task-${task.id}-checked`}>{task.checked}</span>
                </div>
            ))}
        </div>
    )
}