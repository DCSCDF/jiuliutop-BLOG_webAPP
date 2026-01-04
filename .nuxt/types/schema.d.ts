import { NuxtModule, RuntimeConfig } from '@nuxt/schema'
declare module '@nuxt/schema' {
  interface NuxtOptions {
    /**
     * Configuration for `@nuxtjs/tailwindcss`
     */
    ["tailwindcss"]: typeof import("@nuxtjs/tailwindcss").default extends NuxtModule<infer O> ? O : Record<string, any>
    /**
     * Configuration for `@bg-dev/nuxt-naiveui`
     */
    ["naiveui"]: typeof import("@bg-dev/nuxt-naiveui").default extends NuxtModule<infer O> ? O : Record<string, any>
    /**
     * Configuration for `@nuxtjs/color-mode`
     */
    ["colorMode"]: typeof import("@nuxtjs/color-mode").default extends NuxtModule<infer O> ? O : Record<string, any>
    /**
     * Configuration for `@nuxt/devtools`
     */
    ["devtools"]: typeof import("@nuxt/devtools").default extends NuxtModule<infer O> ? O : Record<string, any>
    /**
     * Configuration for `@nuxt/telemetry`
     */
    ["telemetry"]: typeof import("@nuxt/telemetry").default extends NuxtModule<infer O> ? O : Record<string, any>
  }
  interface NuxtConfig {
    /**
     * Configuration for `@nuxtjs/tailwindcss`
     */
    ["tailwindcss"]?: typeof import("@nuxtjs/tailwindcss").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    /**
     * Configuration for `@bg-dev/nuxt-naiveui`
     */
    ["naiveui"]?: typeof import("@bg-dev/nuxt-naiveui").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    /**
     * Configuration for `@nuxtjs/color-mode`
     */
    ["colorMode"]?: typeof import("@nuxtjs/color-mode").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    /**
     * Configuration for `@nuxt/devtools`
     */
    ["devtools"]?: typeof import("@nuxt/devtools").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    /**
     * Configuration for `@nuxt/telemetry`
     */
    ["telemetry"]?: typeof import("@nuxt/telemetry").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    modules?: (undefined | null | false | NuxtModule<any> | string | [NuxtModule | string, Record<string, any>] | ["@nuxtjs/tailwindcss", Exclude<NuxtConfig["tailwindcss"], boolean>] | ["@bg-dev/nuxt-naiveui", Exclude<NuxtConfig["naiveui"], boolean>] | ["@nuxtjs/color-mode", Exclude<NuxtConfig["colorMode"], boolean>] | ["@nuxt/devtools", Exclude<NuxtConfig["devtools"], boolean>] | ["@nuxt/telemetry", Exclude<NuxtConfig["telemetry"], boolean>])[],
  }
}
declare module 'nuxt/schema' {
  interface NuxtOptions {
    /**
     * Configuration for `@nuxtjs/tailwindcss`
     * @see https://www.npmjs.com/package/@nuxtjs/tailwindcss
     */
    ["tailwindcss"]: typeof import("@nuxtjs/tailwindcss").default extends NuxtModule<infer O> ? O : Record<string, any>
    /**
     * Configuration for `@bg-dev/nuxt-naiveui`
     * @see https://www.npmjs.com/package/@bg-dev/nuxt-naiveui
     */
    ["naiveui"]: typeof import("@bg-dev/nuxt-naiveui").default extends NuxtModule<infer O> ? O : Record<string, any>
    /**
     * Configuration for `@nuxtjs/color-mode`
     * @see https://www.npmjs.com/package/@nuxtjs/color-mode
     */
    ["colorMode"]: typeof import("@nuxtjs/color-mode").default extends NuxtModule<infer O> ? O : Record<string, any>
    /**
     * Configuration for `@nuxt/devtools`
     * @see https://www.npmjs.com/package/@nuxt/devtools
     */
    ["devtools"]: typeof import("@nuxt/devtools").default extends NuxtModule<infer O> ? O : Record<string, any>
    /**
     * Configuration for `@nuxt/telemetry`
     * @see https://www.npmjs.com/package/@nuxt/telemetry
     */
    ["telemetry"]: typeof import("@nuxt/telemetry").default extends NuxtModule<infer O> ? O : Record<string, any>
  }
  interface NuxtConfig {
    /**
     * Configuration for `@nuxtjs/tailwindcss`
     * @see https://www.npmjs.com/package/@nuxtjs/tailwindcss
     */
    ["tailwindcss"]?: typeof import("@nuxtjs/tailwindcss").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    /**
     * Configuration for `@bg-dev/nuxt-naiveui`
     * @see https://www.npmjs.com/package/@bg-dev/nuxt-naiveui
     */
    ["naiveui"]?: typeof import("@bg-dev/nuxt-naiveui").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    /**
     * Configuration for `@nuxtjs/color-mode`
     * @see https://www.npmjs.com/package/@nuxtjs/color-mode
     */
    ["colorMode"]?: typeof import("@nuxtjs/color-mode").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    /**
     * Configuration for `@nuxt/devtools`
     * @see https://www.npmjs.com/package/@nuxt/devtools
     */
    ["devtools"]?: typeof import("@nuxt/devtools").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    /**
     * Configuration for `@nuxt/telemetry`
     * @see https://www.npmjs.com/package/@nuxt/telemetry
     */
    ["telemetry"]?: typeof import("@nuxt/telemetry").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    modules?: (undefined | null | false | NuxtModule<any> | string | [NuxtModule | string, Record<string, any>] | ["@nuxtjs/tailwindcss", Exclude<NuxtConfig["tailwindcss"], boolean>] | ["@bg-dev/nuxt-naiveui", Exclude<NuxtConfig["naiveui"], boolean>] | ["@nuxtjs/color-mode", Exclude<NuxtConfig["colorMode"], boolean>] | ["@nuxt/devtools", Exclude<NuxtConfig["devtools"], boolean>] | ["@nuxt/telemetry", Exclude<NuxtConfig["telemetry"], boolean>])[],
  }
  interface RuntimeConfig {
   app: {
      buildId: string,

      baseURL: string,

      buildAssetsDir: string,

      cdnURL: string,
   },

   nitro: {
      envPrefix: string,
   },
  }
  interface PublicRuntimeConfig {
   naiveui: {
      colorModePreference: string,

      colorModePreferenceCookieName: string,

      iconDownload: boolean,

      iconCollectionsUrl: string,

      iconSize: number,

      spaLoadingTemplate: any,

      themeConfig: {
         dark: {
            common: {
               lineHeight: string,

               textColorBase: string,

               primaryColor: string,

               primaryColorHover: string,

               primaryColorPressed: string,

               primaryColorSuppl: string,

               infoColor: string,

               infoColorHover: string,

               infoColorPressed: string,

               infoColorSuppl: string,

               successColor: string,

               successColorHover: string,

               successColorPressed: string,

               successColorSuppl: string,

               warningColor: string,

               warningColorHover: string,

               warningColorPressed: string,

               warningColorSuppl: string,

               errorColor: string,

               errorColorHover: string,

               errorColorPressed: string,

               errorColorSuppl: string,

               tabColor: string,

               tableColorStriped: string,

               pressedColor: string,

               actionColor: string,

               tableHeaderColor: string,

               tableColorHover: string,

               inputColorDisabled: string,

               buttonColor2: string,

               buttonColor2Pressed: string,

               closeColorPressed: string,

               dividerColor: string,

               borderColor: string,

               hoverColor: string,

               inputColor: string,

               buttonColor2Hover: string,

               closeColorHover: string,

               progressRailColor: string,

               codeColor: string,

               avatarColor: string,

               scrollbarColor: string,

               railColor: string,

               placeholderColorDisabled: string,

               iconColorDisabled: string,

               iconColorPressed: string,

               clearColorPressed: string,

               scrollbarColorHover: string,

               placeholderColor: string,

               textColorDisabled: string,

               clearColor: string,

               iconColor: string,

               iconColorHover: string,

               clearColorHover: string,

               closeIconColorHover: string,

               closeIconColor: string,

               closeIconColorPressed: string,

               textColor3: string,

               textColor2: string,

               textColor1: string,

               bodyColor: string,

               baseColor: string,

               invertedColor: string,

               tableColor: string,

               cardColor: string,

               tagColor: string,

               modalColor: string,

               popoverColor: string,
            },

            Skeleton: {
               color: string,

               colorEnd: string,
            },

            Tag: {
               colorBordered: string,
            },

            Tooltip: {
               color: string,

               textColor: string,
            },

            Slider: {
               indicatorColor: string,

               indicatorTextColor: string,
            },

            Layout: {
               siderColor: string,

               headerColor: string,

               footerColor: string,
            },

            Tabs: {
               tabColorSegment: string,
            },

            IconWrapper: {
               color: string,

               iconColor: string,
            },

            Input: {
               lineHeightTextarea: string,
            },

            LoadingBar: {
               height: string,
            },

            Form: {
               feedbackPadding: string,
            },
         },

         light: {
            common: {
               lineHeight: string,

               textColorBase: string,

               bodyColor: string,

               textColor1: string,

               textColor2: string,

               textColor3: string,
            },

            Menu: {
               itemTextColorHorizontalInverted: string,

               itemIconColorInverted: string,

               itemTextColorInverted: string,

               itemTextColorHoverHorizontalInverted: string,

               itemIconColorHoverHorizontalInverted: string,

               itemTextColorActiveHorizontalInverted: string,

               itemIconColorActiveHorizontalInverted: string,

               itemTextColorActiveHoverHorizontalInverted: string,

               itemIconColorActiveHoverHorizontalInverted: string,

               itemTextColorChildActiveHorizontalInverted: string,

               itemIconColorChildActiveHorizontalInverted: string,

               itemTextColorChildActiveHoverHorizontalInverted: string,

               itemIconColorChildActiveHoverHorizontalInverted: string,

               itemTextColorHoverInverted: string,

               itemIconColorHoverInverted: string,

               arrowColorHoverInverted: string,

               itemTextColorChildActiveInverted: string,

               itemIconColorChildActiveHoverInverted: string,

               itemIconColorChildActiveInverted: string,

               arrowColorChildActiveInverted: string,

               arrowColorChildActiveHoverInverted: string,

               arrowColorActiveInverted: string,

               arrowColorActiveHoverInverted: string,
            },

            Layout: {
               siderColor: string,

               headerColor: string,

               footerColor: string,
            },

            IconWrapper: {
               color: string,

               iconColor: string,
            },

            Input: {
               lineHeightTextarea: string,
            },

            LoadingBar: {
               height: string,
            },

            Form: {
               feedbackPadding: string,
            },
         },

         mobileOrTablet: {
            common: {
               fontSize: string,

               heightMedium: string,

               fontSizeMedium: string,
            },

            Form: {
               labelFontSizeTopMedium: string,
            },

            Input: {
               heightMedium: string,

               fontSizeMedium: string,
            },

            Button: {
               heightMedium: string,

               fontSizeMedium: string,
            },

            Card: {
               fontSizeMedium: string,
            },

            Avatar: {
               heightMedium: string,

               fontSize: string,
            },

            ColorPicker: {
               heightMedium: string,

               fontSizeMedium: string,
            },

            Dropdown: {
               optionHeightMedium: string,

               fontSizeMedium: string,
            },

            Radio: {
               buttonHeightMedium: string,

               fontSizeMedium: string,
            },

            Skeleton: {
               heightMedium: string,
            },

            Tag: {
               heightMedium: string,

               fontSizeMedium: string,
            },

            Result: {
               fontSizeMedium: string,
            },

            Tabs: {
               tabFontSizeMedium: string,
            },

            Pagination: {
               itemSizeMedium: string,
            },
         },

         mobile: any,

         shared: any,
      },
   },
  }
}
declare module 'vue' {
        interface ComponentCustomProperties {
          $config: RuntimeConfig
        }
      }