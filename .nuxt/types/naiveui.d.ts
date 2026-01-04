
      import {RouteLocationRaw} from '#vue-router'
      export interface MenuLinkRoute {
        label: string
        icon?: string
        to?: RouteLocationRaw
        children?: MenuLinkRoute[]
      }
      export interface TabbarRoute {
        label: string
        iconSelected: string
        iconUnselected: string
        to: RouteLocationRaw
      }