import dayjsLib, { ConfigType, Dayjs } from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isBetween from 'dayjs/plugin/isBetween';
import arraySupport from 'dayjs/plugin/arraySupport';
import updateLocale from 'dayjs/plugin/updateLocale';
import 'dayjs/locale/ko';

// global
dayjsLib.extend(isSameOrBefore);
dayjsLib.extend(arraySupport);
dayjsLib.extend(isSameOrAfter);
dayjsLib.extend(isBetween);
dayjsLib.extend(updateLocale);
dayjsLib.locale('ko');

dayjsLib.updateLocale('ko', {
  invalidDate: '-'
});

const dayjs = (date?: ConfigType, ...props: any): Dayjs => {
  if (typeof date === 'string') {
    return dayjsLib(date.replace(/\./g, '-'));
  }
  return dayjsLib(date, ...props);
};

export default dayjs;
