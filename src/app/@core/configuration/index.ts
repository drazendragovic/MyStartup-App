import { Configuration } from '../models/config';

export const appConfig: Configuration = {
    colorTheme      : 'theme-orange-gray-dark',
    customScrollbars: true,
    layout          : {
        style    : 'horizontal-layout',
        width    : 'fullwidth',
        navbar   : {
            primaryBackground  : 'broadcast-gray-800',
            secondaryBackground: 'broadcast-gray-700',
            folded             : false,
            hidden             : false,
            position           : 'top',
            variant            : 'horizontal'
        },
        toolbar  : {
            customBackgroundColor: false,
            background           : 'broadcast-white-500',
            hidden               : false,
            position             : 'above'
        },
        footer   : {
            customBackgroundColor: true,
            background           : 'broadcast-gray-800',
            hidden               : false,
            position             : 'above-fixed'
        },
        sidepanel: {
            hidden  : true,
            position: 'right'
        }
    }
};
