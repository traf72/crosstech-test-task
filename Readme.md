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

* Выполнить команду `npm install` из директории TestTask.Web\ClientApp
* Выполнить команду `npm run build` из директории TestTask.Web\ClientApp
* Выполнить команду `dotnet run` из директории TestTask.Web
* Перейти в браузере по адресу http://localhost:5000.

Для запуска клиентских тестов необходимо выполнить команду `npm test` из директории TestTask.Web\ClientApp.

В приложении предопределены два пользователя: admin и user с соответствующими ролями. Пароль для обоих пользователей: Qw123456!