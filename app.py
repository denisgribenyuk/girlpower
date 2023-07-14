import os, sys, logging
import requests
from flask import Flask, render_template, request, Response

app = Flask(__name__, template_folder='static')
TOKEN = '6269962317:AAESafJyBrttCWJjCo-1Jjz1r-PciIls6vI'
CHAT_ID = '115891939'


log_file = os.path.join(os.getcwd(), 'logs.txt')

# Создание объекта логгера
logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)
file_handler = logging.FileHandler(log_file, mode='a')
file_handler.setLevel(logging.DEBUG)

# Создание форматировщика логов
formatter = logging.Formatter('%(asctime)s - %(levelname)s - %(message)s')


# Добавление обработчика к логгеру приложения
logger.addHandler(file_handler)


@app.get('/')
def index():
    user_agent = request.headers.get('User-Agent')
    ip_address = request.remote_addr
    logger.info('Пользователь открыл главную страницу. IP: %s, User-Agent: %s', ip_address, user_agent)
    return render_template('index.html')


@app.get('/policy')
def policy():
    user_agent = request.headers.get('User-Agent')
    ip_address = request.remote_addr
    logger.info('Пользователь открыл страницу policy. IP: %s, User-Agent: %s', ip_address, user_agent)
    return render_template('policy.html')


@app.post('/feedback')
def feedback():
    m = request.form['message']
    p = request.form['phone']
    n = request.form['name']
    user_agent = request.headers.get('User-Agent')
    ip_address = request.remote_addr
    message = f"Имя: {n}\nТелефон: {p}\nСообщение: {m}"

    url = f"https://api.telegram.org/bot{TOKEN}/sendMessage?chat_id={CHAT_ID}&text={message}"
    try:
        requests.get(url)
    except Exception as e:
        logger.error(f'ОШИБКА от от пользователя. IP: {ip_address}, User-Agent: {user_agent}, Сообщение {message} \n {e}')
        raise e
    logger.info('Получено новое сообщение от пользователя. IP: %s, User-Agent: %s\n%s', ip_address, user_agent, message)
    return Response('OK')


if __name__ == '__main__':
    logger.info('Приложение запущено')
    app.run()
