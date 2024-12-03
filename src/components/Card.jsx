import { motion } from "framer-motion";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Button from "./Button";
import { Checkbox } from "./ui/checkbox";
import { useDispatch, useSelector } from "react-redux";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { deleteTask, editTask, toggleCompletion } from "@/redux/counter/TaskSlice";

function CardComponent() {
  const { tasks, searchTerm, activeFilter } = useSelector((state) => state.tasks);
  const dispatch = useDispatch();

  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDesc, setEditDesc] = useState("");
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

  if (!tasks) {
    return <div>No tasks available</div>;
  }

  const handleEdit = (id, title, desc) => {
    setEditId(id);
    setEditTitle(title);
    setEditDesc(desc);
  };

  const handleSave = (id) => {
    if (editTitle.trim() || editDesc.trim()) {
      dispatch(editTask({ id, newTitle: editTitle, newDesc: editDesc }));
      setEditId(null);
      setEditTitle("");
      setEditDesc("");
    }
  };

  const openDeleteModal = (task) => {
    setTaskToDelete(task);
    setDeleteModalOpen(true);
  };

  const handleDelete = (id) => {
    dispatch(deleteTask(id));
    setDeleteModalOpen(false);
    setTaskToDelete(null);
  };

  const cancelDelete = () => {
    setDeleteModalOpen(false);
    setTaskToDelete(null);
  };

  const handleCompleteToggle = (task) => {
    dispatch(toggleCompletion(task.id));
  };

  const filteredTasks = tasks.filter((task) => {
    if (activeFilter === "Completed Tasks") return task.completed;
    if (activeFilter === "Pending Tasks") return !task.completed;
    return (
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.desc.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <>
      {filteredTasks.map((task) => (
        <motion.div
          key={task.id}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full"
        >
          <Card className="bg-white shadow-2xl rounded-2xl overflow-hidden hover:shadow-lg transition-all transform hover:scale-105">
            <CardHeader className="border-b p-6 bg-gray-50">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <CardTitle className="text-2xl font-semibold text-gray-800">{task.title}</CardTitle>
              </motion.div>
            </CardHeader>
            <CardContent className="p-6">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="text-gray-600 text-lg"
              >
                {task.desc}
              </motion.p>
            </CardContent>
            <CardFooter className="flex justify-between items-center p-4">
              <div className="flex items-center gap-4">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7, duration: 0.5 }}
                >
                  {task.id === editId ? (
                    <Popover>
                      <PopoverTrigger>
                        <Button
                          bgColor="bg-green-500"
                          textColor="white"
                          paddingX="4"
                          hoverColor="green"
                          onClick={() => handleEdit(task.id, task.title, task.desc)}
                        >
                          Edit
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent>
                        <Label htmlFor="taskTitle" className="block text-sm font-medium mb-4">
                          Edit Task Title
                        </Label>
                        <Input
                          id="taskTitle"
                          type="text"
                          placeholder="Enter task title"
                          className="w-full mb-4"
                          value={editTitle}
                          onChange={(e) => setEditTitle(e.target.value)}
                        />
                        <Label htmlFor="taskDescription" className="block text-sm font-medium mb-4">
                          Edit Task Description
                        </Label>
                        <Textarea
                          id="taskDescription"
                          placeholder="Enter task description"
                          rows="4"
                          className="w-full mb-4"
                          value={editDesc}
                          onChange={(e) => setEditDesc(e.target.value)}
                        />
                        <Button
                          tag="button"
                          bgColor="bg-blue-500"
                          textColor="white"
                          paddingX="6"
                          hoverColor="bg-blue-700"
                          onClick={() => handleSave(task.id)}
                        >
                          Save
                        </Button>
                      </PopoverContent>
                    </Popover>
                  ) : (
                    <Button
                      bgColor="bg-green-500"
                      textColor="white"
                      paddingX="4"
                      hoverColor="green"
                      onClick={() => handleEdit(task.id, task.title, task.desc)}
                    >
                      Edit
                    </Button>
                  )}
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7, duration: 0.5 }}
                >
                  <Button
                    bgColor="bg-red-400"
                    textColor="white"
                    paddingX="4"
                    hoverColor="red"
                    onClick={() => openDeleteModal(task)}
                  >
                    Delete
                  </Button>
                </motion.div>
              </div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="flex items-center space-x-2"
              >
                <Checkbox
                  checked={task.completed}
                  onCheckedChange={() => handleCompleteToggle(task)}  
                />
                <span>{task.completed ? "Completed" : "Pending"}</span>
              </motion.div>
            </CardFooter>
          </Card>
        </motion.div>
      ))}

      {isDeleteModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-xs w-full">
            <h3 className="text-lg font-semibold mb-4">Are you sure you want to delete this task?</h3>
            <div className="flex justify-between">
              <Button
                bgColor="bg-red-500"
                textColor="white"
                paddingX="2"
                onClick={() => handleDelete(taskToDelete?.id)}
              >
                Confirm
              </Button>
              <Button
                bgColor="bg-gray-500"
                textColor="white"
                paddingX="2"
                onClick={cancelDelete}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default CardComponent;
