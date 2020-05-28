import { RS }  from '~/hooks/use-root-selector';
import { Geo } from '~/interfaces/geo';

export const $geo: RS<Geo|null> = s => s.geo;
