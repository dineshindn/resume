import { message } from 'antd';

const logger = err => {
  console.log(err, "err")
  if (err && !err.response) {
    message.error('API Connection failed');
  }

  if (err && err.response) {
    const { status } = err.response;
    switch (status) {
      default:
        console.error(err);
    }
  }
};

export default logger;
