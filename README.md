# online Doctor

To Run Application

One time process required to setup the Application runtime environent
################################################################################

1.Install Python Intepreter from here https://www.python.org/ftp/python/3.11.0/python-3.11.0-amd64.exe

2.Install NodeJs from here https://nodejs.org/dist/v18.12.1/node-v18.12.1-x64.msi

3.Change to online_doctor directory

cd online_doctor

4.Install python dependencies run be below command

pip install -r requireents.txt

5.To create the required tables run below command

python manage.py migrate

6. Install React dependencies

cd web
yarn install


To run the Application
################################################################################

1.Run the python Application run below command

python manage.py runserver



2.Run the React Application run below command

cd web
yarn start

3. Open URL http://localhost:3000



