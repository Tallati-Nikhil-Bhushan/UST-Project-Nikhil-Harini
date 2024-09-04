package com.example.wellnesshub.model;

public class CalorieCalculator {
	public static int[] calculateCaloriesIntake(User user) {
        // Calculate BMR using the Mifflin-St Jeor Equation
        double BMR;
        double caloriesToBeBurned = 0;
        if (user.getGender().equalsIgnoreCase("male")) {
            BMR = (10 * user.getWeight()) + (6.25 * user.getHeight()) - (5 * user.getAge()) + 5;
        } else {
            BMR = (10 * user.getWeight()) + (6.25 * user.getHeight()) - (5 * user.getAge()) - 161;
        }

        // Determine the activity factor based on user's activity level
        double activityFactor;
        switch (user.getActivityLevel()) {
            case 1: // Sedentary
                activityFactor = 1.2;
                caloriesToBeBurned = BMR*(activityFactor-1);
                break;
            case 2: // Lightly active
                activityFactor = 1.375;
                caloriesToBeBurned = BMR*(activityFactor-1);
                break;
            case 3: // Moderately active
                activityFactor = 1.55;
                caloriesToBeBurned = BMR*(activityFactor-1);
                break;
            case 4: // Very active
                activityFactor = 1.725;
                caloriesToBeBurned = BMR*(activityFactor-1);
                break;
            case 5: // Super active
                activityFactor = 1.9;
                caloriesToBeBurned = BMR*(activityFactor-1);
                break;
            default:
                activityFactor = 2; // Default to sedentary if not specified
        }

        // Calculate TDEE
        return new int[] {(int) (BMR * activityFactor),(int)caloriesToBeBurned,user.getActivityLevel()};
    }
}
