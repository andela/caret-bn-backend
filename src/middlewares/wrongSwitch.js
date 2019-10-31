import responseError from '../utils/responseError';
import findUser from '../helpers/findUser';

const wrongSwitch = async (req, res, next) => {
  const { id } = req.user.payload;
  const { switchParam } = req.params;

  if ((switchParam !== 'email-notification') && (switchParam !== 'app-notification')) {
    return responseError(res, 400, `Ooops! Switch '${switchParam}' does not exist`);
  }

  const user = await findUser({ id });

  const switchIsEmail = (switchParam.includes('email-notification'));
  const value = switchIsEmail ? user.emailNotif : user.appNotif;
  req.switchIsEmail = switchIsEmail;
  req.message = switchIsEmail ? 'Email' : 'App';
  req.ObjectToUpdate = switchIsEmail ? { emailNotif: !value } : { appNotif: !value };

  return next();
};

export default wrongSwitch;
