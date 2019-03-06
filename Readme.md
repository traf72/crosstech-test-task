## Постановка:

1. Требуется авторизация пользователя по логину/паролю.
2. Предусмотреть две роли – администратор и линейный пользователь.
3. Отображается список сотрудников организации в виде:
	* Имя
	* Отчество
	* Фамилия
	* Пол
	* Должность
	* Дата рождения
	* Телефон
4. Сотрудников можно добавлять, удалять, а также изменять их данные, но доступ к подобному функционалу есть только у администратора.
5. В поля имени, отчества и фамилии можно ввести только русские буквы.
6. Поля "Пол" и "Должность" – выпадающий список с фиксированным количеством значений.
7. Дата рождения – можно выбрать дату от 01.01.1940 до 31.12.2005.
8. Данные приложения хранятся в произвольном виде (xml, база данных, текстовый файл, прочее).
9. Валидация телефона в формате +7 (xxx) xxx-xx-xx.
10. Отобразить круговую диаграмму сотрудников по полам.
11. Отобразить круговую диаграмму сотрудников по десятилетиям рождения.

## Технологии:

* SQLite
* ASP.NET Core 2
* Entity Framework Core
* React
* Redux
* Redux-saga
* [Redux-ducks](https://github.com/erikras/ducks-modular-redux)
* Bootstrap 4

Проект можно запустить из Visual Studio 2017 (должен быть установлен пакет [.NET Core SDK](https://dotnet.microsoft.com/download)). Восстановление npm-пакетов может занять несколько минут.

При отсутствии Visual Studio 2017 проект можно запустить следующим образом:

* Выполнить команду `npm install` из директории TestTask.Web\ClientApp.
* Выполнить команду `npm run build` из директории TestTask.Web\ClientApp.
* Выполнить команду `dotnet run` из директории TestTask.Web.
* Перейти в браузере по адресу http://localhost:5000.

Для запуска клиентских тестов необходимо выполнить команду `npm test` из директории TestTask.Web\ClientApp.

В приложении предопределены два пользователя: admin и user с соответствующими ролями. Пароль для обоих пользователей: Qw123456!