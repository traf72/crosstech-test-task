## Problem Statement

#### Write a WEB application using ASP.NET Core which includes following functionality:

1. User authorization using login and password.
2. Two roles: an administrator and a plain user.
3. Show the list of the organization employees as:
	* Name
	* Patronymic
	* Surname
	* Gender
	* Position
	* Date of birth
	* Phone
4. It's possible to add, remove or update an employee, but it can be done only by the administrator.
5. Only Russian symbols are allowed in "Name", "Surname" and "Patronymic" fields.
6. The fields "Gender" and "Position" are dropdowns with fixed values.
7. Only 01.01.1940-31.12.2005 values are allowed for the "Date of birth" field.
8. Phone validation in the format +7 (xxx) xxx-xx-xx.
9. Show the pie chart of employees by gender.
10. Show the pie chart of employees by decades of birth.
11. The data of the application are stored in an arbitrary way (xml, database, text file or somewhere else).

## Technology stack

* SQLite
* ASP.NET Core 2
* Entity Framework Core
* React
* Redux
* Redux-saga
* [Redux-ducks](https://github.com/erikras/ducks-modular-redux)
* Bootstrap 4
* Flow

You can run this project from Visual Studio 2017 or above ([.NET Core SDK](https://dotnet.microsoft.com/download) should be installed). The restoring of npm-packages can take a while.

If you don't have Visual Studio 2017 you can run this project as follows:

* Run the `npm install` command from the TestTask.Web\ClientApp directory.
* Run the `npm run build` command from the TestTask.Web\ClientApp directory.
* Run the `dotnet run` command from the TestTask.Web directory.
* Open the http://localhost:5000 URL in your browser.

To launch client unit tests run the `npm test` command from the TestTask.Web\ClientApp directory.

There are two built-in users in the application: "admin" and "user" with the appropriate roles. The password for both users is Qw123456!