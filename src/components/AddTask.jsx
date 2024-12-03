import Button from "./Button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
    DrawerClose, Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger,
} from "@/components/ui/drawer"
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "@/redux/counter/TaskSlice";

function AddTask() {
    const [taskTitle, setTaskTitle] = useState("");
    const [taskDesc, setTaskDesc] = useState("");
    const dispatch = useDispatch()

    function handleAdd() {
        dispatch(addTask({ taskTitle, taskDesc }));
        setTaskTitle("");
        setTaskDesc("");
    }

    return (
        <Drawer>
            <DrawerTrigger>
                <Button
                    tag="button"
                    bgColor="bg-blue-500"
                    textColor="white"
                    paddingX="8"
                    hoverColor="blue"
                    marginX="3"
                    marginY="1"
                    className="sm:px-6 sm:py-2 lg:px-10 lg:py-3 "
                >
                    Add Task
                </Button>

            </DrawerTrigger>
            <DrawerContent className="p-6 flex flex-col items-center">
                <DrawerHeader>
                    <DrawerTitle className="text-xl font-semibold">Add Task</DrawerTitle>
                </DrawerHeader>
                <DrawerDescription className="w-full max-w-lg">

                    <Label htmlFor="taskTitle" className="block text-sm font-medium mb-4">
                        Task Title
                    </Label>
                    <Input
                        id="taskTitle"
                        type="text"
                        value={taskTitle}
                        onChange={(e) => setTaskTitle(e.target.value)}
                        placeholder="Enter task title"
                        className="w-full mb-4"
                    />

                    <Label htmlFor="taskDescription" className="block text-sm font-medium mb-4">
                        Task Description
                    </Label>
                    <Textarea
                        id="taskDescription"
                        placeholder="Enter task description"
                        value={taskDesc}
                        onChange={(e) => setTaskDesc(e.target.value)}
                        rows="4"
                        className="w-full mb-4"
                    />
                    <DrawerClose>
                        <Button
                            tag="button"
                            bgColor="bg-blue-500"
                            textColor="white"
                            paddingX="6"
                            hoverColor="bg-blue-700"
                            onClick={handleAdd}
                        >
                            Add Task
                        </Button>
                    </DrawerClose>
                </DrawerDescription>
            </DrawerContent>
        </Drawer>
    );
}

export default AddTask;
