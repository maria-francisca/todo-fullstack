import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as taskApi from "../api/taskApi";

export const useTasks = () => {
  const queryClient = useQueryClient();

  const tasksQuery = useQuery({
    queryKey: ["tasks"],
    queryFn: taskApi.getTasks,
  });

  const addTask = useMutation({
    mutationFn: taskApi.createTask,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
  });

  const complete = useMutation({
    mutationFn: taskApi.updateTask,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
  });

  const remove = useMutation({
    mutationFn: taskApi.deleteTask,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
  });

  const changeTitle = useMutation({
    mutationFn: taskApi.changeTitle,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] })
  });

  return { tasksQuery, addTask, complete, remove, changeTitle };
};
