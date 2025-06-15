export function useTaskStatus(address?: string) {
  // Simulated check – replace with real logic or API later
  const hasCompletedTasks = address ? true : false;

  return {
    hasCompletedTasks,
    isLoading: false,
  };
}