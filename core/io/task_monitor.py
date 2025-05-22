import time
import ee


def wait_for_tasks(task_tuples, check_interval=30):
    """
    Waits for a list of Earth Engine export tasks to finish.

    Args:
        task_tuples (list): List of (tile_id, task_id) tuples
        check_interval (int): Seconds between status checks
    """
    print(f"\nWaiting for {len(task_tuples)} tasks to complete...")
    remaining = list(task_tuples)

    while remaining:
        time.sleep(check_interval)
        still_running = []
        for tile_id, task_id in remaining:
            task = ee.batch.Task.list()[[t.id for t in ee.batch.Task.list()].index(task_id)]
            status = task.status().get('state', 'UNKNOWN')
            if status in ['COMPLETED', 'FAILED', 'CANCELLED']:
                print(f"✓ Task for tile {tile_id} finished with status: {status}")
                if status == 'FAILED':
                    print(f"  Error message: {task.status().get('error_message', 'Unknown error')}")
                    raise Exception(f"Task for tile {tile_id} failed with status: {task.status()}")
            else:
                still_running.append((tile_id, task_id))

        remaining = still_running

    print("All export tasks completed.\n")