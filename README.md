## Getting Started
First, "yarn" inside root to install dependencies then "yarn dev" to run the development server:
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Developer Notes
Components Structure
The project follows a component-based architecture. Here's a brief overview of the main components:
UserListing: Responsible for displaying the list of users. It includes functionality for filtering by gender, searching by name, and pagination.
UserProfilePage: Displays the detailed profile of a single user. It includes the user's name, email, phone, address, age, profile picture, nationality flag, and Google Maps location.
Searchbox Functionality
The search functionality in the UserListing component is implemented using a controlled input element. Here's how it works:
The searchQuery state variable holds the current value of the search input.
The handleSearchChange function is called whenever the input value changes.
Filtering of users is performed based on whether the search query matches the user's name. This filtering is applied dynamically as the user types in the search input.
The implementation ensures that the user interface is responsive and updates in real-time as the user interacts with the search input.

For more detailed information on each component and its functionality, please refer to the codebase.



Google Maps Api is paid, so ive implemented it but placed nothing in place of key.
