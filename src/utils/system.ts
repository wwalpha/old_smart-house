import * as moment from 'moment';

export const getTimeStamp = () => moment().utc().format('YYYYMMDDHHmmssSSS');

export const isMobile = (() => (typeof device === 'undefined' ? false : true))();
