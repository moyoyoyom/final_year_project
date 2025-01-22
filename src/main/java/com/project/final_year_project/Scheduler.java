package com.project.final_year_project;

import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

public class Scheduler {

    // This is runs the specified task on a daily basis
    public void runDailyTask() {
        ScheduledExecutorService scheduler = Executors.newScheduledThreadPool(1);
        Runnable dailyTask = () -> {
            // replace this with a method that deletes data from the database, and replaces
            // it with the new and updated data
            System.out.println("The task has been run");
        };

        scheduler.scheduleAtFixedRate(dailyTask, 0, 1, TimeUnit.DAYS);
    }
}
