
import type { DefineComponent, SlotsType } from 'vue'
type IslandComponent<T extends DefineComponent> = T & DefineComponent<{}, {refresh: () => Promise<void>}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, SlotsType<{ fallback: { error: unknown } }>>
type HydrationStrategies = {
  hydrateOnVisible?: IntersectionObserverInit | true
  hydrateOnIdle?: number | true
  hydrateOnInteraction?: keyof HTMLElementEventMap | Array<keyof HTMLElementEventMap> | true
  hydrateOnMediaQuery?: string
  hydrateAfter?: number
  hydrateWhen?: boolean
  hydrateNever?: true
}
type LazyComponent<T> = (T & DefineComponent<HydrationStrategies, {}, {}, {}, {}, {}, {}, { hydrated: () => void }>)
interface _GlobalComponents {
      'RichTextEditor': typeof import("../components/RichTextEditor.vue")['default']
    'Appheader': typeof import("../components/appheader.vue")['default']
    'ArticleToc': typeof import("../components/articleToc.vue")['default']
    'Blogcard': typeof import("../components/blogcard.vue")['default']
    'Category': typeof import("../components/category.vue")['default']
    'DarkButton': typeof import("../components/darkButton.vue")['default']
    'Dashboard': typeof import("../components/dashboard.vue")['default']
    'Heros': typeof import("../components/heros.vue")['default']
    'LinkMessage': typeof import("../components/linkMessage.vue")['default']
    'Links': typeof import("../components/links.vue")['default']
    'Notification': typeof import("../components/notification.vue")['default']
    'Posts': typeof import("../components/posts.vue")['default']
    'ReusableSidebar': typeof import("../components/reusableSidebar.vue")['default']
    'SettingHeadLink': typeof import("../components/settingHeadLink.vue")['default']
    'SettingLink': typeof import("../components/settingLink.vue")['default']
    'SettingLsky': typeof import("../components/settingLsky.vue")['default']
    'SettingRss': typeof import("../components/settingRss.vue")['default']
    'SettingSeo': typeof import("../components/settingSeo.vue")['default']
    'SettingUser': typeof import("../components/settingUser.vue")['default']
    'SettingWelcome': typeof import("../components/settingWelcome.vue")['default']
    'Settings': typeof import("../components/settings.vue")['default']
    'Sidebar': typeof import("../components/sidebar.vue")['default']
    'NuxtWelcome': typeof import("../node_modules/nuxt/dist/app/components/welcome.vue")['default']
    'NuxtLayout': typeof import("../node_modules/nuxt/dist/app/components/nuxt-layout")['default']
    'NuxtErrorBoundary': typeof import("../node_modules/nuxt/dist/app/components/nuxt-error-boundary")['default']
    'ClientOnly': typeof import("../node_modules/nuxt/dist/app/components/client-only")['default']
    'DevOnly': typeof import("../node_modules/nuxt/dist/app/components/dev-only")['default']
    'ServerPlaceholder': typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']
    'NuxtLink': typeof import("../node_modules/nuxt/dist/app/components/nuxt-link")['default']
    'NuxtLoadingIndicator': typeof import("../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']
    'NuxtRouteAnnouncer': typeof import("../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']
    'NuxtImg': typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtImg']
    'NuxtPicture': typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtPicture']
    'NaiveConfig': typeof import("../node_modules/@bg-dev/nuxt-naiveui/dist/runtime/components/NaiveConfig.vue")['default']
    'NaiveNavbar': typeof import("../node_modules/@bg-dev/nuxt-naiveui/dist/runtime/components/NaiveNavbar.vue")['default']
    'NaiveColorModeSwitch': typeof import("../node_modules/@bg-dev/nuxt-naiveui/dist/runtime/components/NaiveColorModeSwitch.vue")['default']
    'NaiveTabbar': typeof import("../node_modules/@bg-dev/nuxt-naiveui/dist/runtime/components/NaiveTabbar.vue")['default']
    'NaiveMenuLink': typeof import("../node_modules/@bg-dev/nuxt-naiveui/dist/runtime/components/NaiveMenuLink.vue")['default']
    'NaiveLayoutSidebar': typeof import("../node_modules/@bg-dev/nuxt-naiveui/dist/runtime/components/NaiveLayoutSidebar.vue")['default']
    'NaiveLayoutNavbar': typeof import("../node_modules/@bg-dev/nuxt-naiveui/dist/runtime/components/NaiveLayoutNavbar.vue")['default']
    'NaiveDrawerLink': typeof import("../node_modules/@bg-dev/nuxt-naiveui/dist/runtime/components/NaiveDrawerLink.client.vue")['default']
    'NaiveLoadingBar': typeof import("../node_modules/@bg-dev/nuxt-naiveui/dist/runtime/components/NaiveLoadingBar.client.vue")['default']
    'NaiveNotification': typeof import("../node_modules/@bg-dev/nuxt-naiveui/dist/runtime/components/NaiveNotification.client.vue")['default']
    'NaiveIcon': typeof import("../node_modules/@bg-dev/nuxt-naiveui/dist/runtime/components/NaiveIcon.vue")['default']
    'NThemeEditor': typeof import("naive-ui")['NThemeEditor']
    'NAffix': typeof import("naive-ui")['NAffix']
    'NAlert': typeof import("naive-ui")['NAlert']
    'NAnchor': typeof import("naive-ui")['NAnchor']
    'NAnchorLink': typeof import("naive-ui")['NAnchorLink']
    'NAutoComplete': typeof import("naive-ui")['NAutoComplete']
    'NAvatar': typeof import("naive-ui")['NAvatar']
    'NAvatarGroup': typeof import("naive-ui")['NAvatarGroup']
    'NBackTop': typeof import("naive-ui")['NBackTop']
    'NBadge': typeof import("naive-ui")['NBadge']
    'NBreadcrumb': typeof import("naive-ui")['NBreadcrumb']
    'NBreadcrumbItem': typeof import("naive-ui")['NBreadcrumbItem']
    'NButton': typeof import("naive-ui")['NButton']
    'NButtonGroup': typeof import("naive-ui")['NButtonGroup']
    'NCalendar': typeof import("naive-ui")['NCalendar']
    'NCard': typeof import("naive-ui")['NCard']
    'NCarousel': typeof import("naive-ui")['NCarousel']
    'NCarouselItem': typeof import("naive-ui")['NCarouselItem']
    'NCascader': typeof import("naive-ui")['NCascader']
    'NCheckbox': typeof import("naive-ui")['NCheckbox']
    'NCheckboxGroup': typeof import("naive-ui")['NCheckboxGroup']
    'NCode': typeof import("naive-ui")['NCode']
    'NCollapse': typeof import("naive-ui")['NCollapse']
    'NCollapseItem': typeof import("naive-ui")['NCollapseItem']
    'NCollapseTransition': typeof import("naive-ui")['NCollapseTransition']
    'NColorPicker': typeof import("naive-ui")['NColorPicker']
    'NConfigProvider': typeof import("naive-ui")['NConfigProvider']
    'NCountdown': typeof import("naive-ui")['NCountdown']
    'NDataTable': typeof import("naive-ui")['NDataTable']
    'NDatePicker': typeof import("naive-ui")['NDatePicker']
    'NDescriptions': typeof import("naive-ui")['NDescriptions']
    'NDescriptionsItem': typeof import("naive-ui")['NDescriptionsItem']
    'NDialog': typeof import("naive-ui")['NDialog']
    'NDialogProvider': typeof import("naive-ui")['NDialogProvider']
    'NDivider': typeof import("naive-ui")['NDivider']
    'NDrawer': typeof import("naive-ui")['NDrawer']
    'NDrawerContent': typeof import("naive-ui")['NDrawerContent']
    'NDropdown': typeof import("naive-ui")['NDropdown']
    'NDynamicInput': typeof import("naive-ui")['NDynamicInput']
    'NDynamicTags': typeof import("naive-ui")['NDynamicTags']
    'NElement': typeof import("naive-ui")['NElement']
    'NEl': typeof import("naive-ui")['NEl']
    'NEllipsis': typeof import("naive-ui")['NEllipsis']
    'NPerformantEllipsis': typeof import("naive-ui")['NPerformantEllipsis']
    'NEmpty': typeof import("naive-ui")['NEmpty']
    'NEquation': typeof import("naive-ui")['NEquation']
    'NFlex': typeof import("naive-ui")['NFlex']
    'NFloatButton': typeof import("naive-ui")['NFloatButton']
    'NFloatButtonGroup': typeof import("naive-ui")['NFloatButtonGroup']
    'NForm': typeof import("naive-ui")['NForm']
    'NFormItem': typeof import("naive-ui")['NFormItem']
    'NFormItemCol': typeof import("naive-ui")['NFormItemCol']
    'NFormItemGi': typeof import("naive-ui")['NFormItemGi']
    'NFormItemGridItem': typeof import("naive-ui")['NFormItemGridItem']
    'NFormItemRow': typeof import("naive-ui")['NFormItemRow']
    'NGlobalStyle': typeof import("naive-ui")['NGlobalStyle']
    'NGradientText': typeof import("naive-ui")['NGradientText']
    'NGrid': typeof import("naive-ui")['NGrid']
    'NGridItem': typeof import("naive-ui")['NGridItem']
    'NGi': typeof import("naive-ui")['NGi']
    'NHighlight': typeof import("naive-ui")['NHighlight']
    'NIcon': typeof import("naive-ui")['NIcon']
    'NIconWrapper': typeof import("naive-ui")['NIconWrapper']
    'NImage': typeof import("naive-ui")['NImage']
    'NImageGroup': typeof import("naive-ui")['NImageGroup']
    'NInfiniteScroll': typeof import("naive-ui")['NInfiniteScroll']
    'NInput': typeof import("naive-ui")['NInput']
    'NInputGroup': typeof import("naive-ui")['NInputGroup']
    'NInputGroupLabel': typeof import("naive-ui")['NInputGroupLabel']
    'NInputNumber': typeof import("naive-ui")['NInputNumber']
    'NLayout': typeof import("naive-ui")['NLayout']
    'NLayoutContent': typeof import("naive-ui")['NLayoutContent']
    'NLayoutFooter': typeof import("naive-ui")['NLayoutFooter']
    'NLayoutHeader': typeof import("naive-ui")['NLayoutHeader']
    'NLayoutSider': typeof import("naive-ui")['NLayoutSider']
    'NCol': typeof import("naive-ui")['NCol']
    'NRow': typeof import("naive-ui")['NRow']
    'NLegacyTransfer': typeof import("naive-ui")['NLegacyTransfer']
    'NList': typeof import("naive-ui")['NList']
    'NListItem': typeof import("naive-ui")['NListItem']
    'NLoadingBarProvider': typeof import("naive-ui")['NLoadingBarProvider']
    'NLog': typeof import("naive-ui")['NLog']
    'NMarquee': typeof import("naive-ui")['NMarquee']
    'NMention': typeof import("naive-ui")['NMention']
    'NMenu': typeof import("naive-ui")['NMenu']
    'NMessageProvider': typeof import("naive-ui")['NMessageProvider']
    'NModal': typeof import("naive-ui")['NModal']
    'NModalProvider': typeof import("naive-ui")['NModalProvider']
    'NNotificationProvider': typeof import("naive-ui")['NNotificationProvider']
    'NNumberAnimation': typeof import("naive-ui")['NNumberAnimation']
    'NPageHeader': typeof import("naive-ui")['NPageHeader']
    'NPagination': typeof import("naive-ui")['NPagination']
    'NPopconfirm': typeof import("naive-ui")['NPopconfirm']
    'NPopover': typeof import("naive-ui")['NPopover']
    'NPopselect': typeof import("naive-ui")['NPopselect']
    'NProgress': typeof import("naive-ui")['NProgress']
    'NQrCode': typeof import("naive-ui")['NQrCode']
    'NRadio': typeof import("naive-ui")['NRadio']
    'NRadioButton': typeof import("naive-ui")['NRadioButton']
    'NRadioGroup': typeof import("naive-ui")['NRadioGroup']
    'NRate': typeof import("naive-ui")['NRate']
    'NResult': typeof import("naive-ui")['NResult']
    'NScrollbar': typeof import("naive-ui")['NScrollbar']
    'NSelect': typeof import("naive-ui")['NSelect']
    'NSkeleton': typeof import("naive-ui")['NSkeleton']
    'NSlider': typeof import("naive-ui")['NSlider']
    'NSpace': typeof import("naive-ui")['NSpace']
    'NSpin': typeof import("naive-ui")['NSpin']
    'NSplit': typeof import("naive-ui")['NSplit']
    'NStatistic': typeof import("naive-ui")['NStatistic']
    'NStep': typeof import("naive-ui")['NStep']
    'NSteps': typeof import("naive-ui")['NSteps']
    'NSwitch': typeof import("naive-ui")['NSwitch']
    'NTable': typeof import("naive-ui")['NTable']
    'NTbody': typeof import("naive-ui")['NTbody']
    'NTd': typeof import("naive-ui")['NTd']
    'NTh': typeof import("naive-ui")['NTh']
    'NThead': typeof import("naive-ui")['NThead']
    'NTr': typeof import("naive-ui")['NTr']
    'NTab': typeof import("naive-ui")['NTab']
    'NTabPane': typeof import("naive-ui")['NTabPane']
    'NTabs': typeof import("naive-ui")['NTabs']
    'NTag': typeof import("naive-ui")['NTag']
    'NThing': typeof import("naive-ui")['NThing']
    'NTime': typeof import("naive-ui")['NTime']
    'NTimePicker': typeof import("naive-ui")['NTimePicker']
    'NTimeline': typeof import("naive-ui")['NTimeline']
    'NTimelineItem': typeof import("naive-ui")['NTimelineItem']
    'NTooltip': typeof import("naive-ui")['NTooltip']
    'NTransfer': typeof import("naive-ui")['NTransfer']
    'NTree': typeof import("naive-ui")['NTree']
    'NTreeSelect': typeof import("naive-ui")['NTreeSelect']
    'NA': typeof import("naive-ui")['NA']
    'NBlockquote': typeof import("naive-ui")['NBlockquote']
    'NH1': typeof import("naive-ui")['NH1']
    'NH2': typeof import("naive-ui")['NH2']
    'NH3': typeof import("naive-ui")['NH3']
    'NH4': typeof import("naive-ui")['NH4']
    'NH5': typeof import("naive-ui")['NH5']
    'NH6': typeof import("naive-ui")['NH6']
    'NHr': typeof import("naive-ui")['NHr']
    'NLi': typeof import("naive-ui")['NLi']
    'NOl': typeof import("naive-ui")['NOl']
    'NP': typeof import("naive-ui")['NP']
    'NText': typeof import("naive-ui")['NText']
    'NUl': typeof import("naive-ui")['NUl']
    'NUpload': typeof import("naive-ui")['NUpload']
    'NUploadDragger': typeof import("naive-ui")['NUploadDragger']
    'NUploadFileList': typeof import("naive-ui")['NUploadFileList']
    'NUploadTrigger': typeof import("naive-ui")['NUploadTrigger']
    'NVirtualList': typeof import("naive-ui")['NVirtualList']
    'NWatermark': typeof import("naive-ui")['NWatermark']
    'ColorScheme': typeof import("../node_modules/@nuxtjs/color-mode/dist/runtime/component.vue3.vue")['default']
    'NuxtPage': typeof import("../node_modules/nuxt/dist/pages/runtime/page")['default']
    'NoScript': typeof import("../node_modules/nuxt/dist/head/runtime/components")['NoScript']
    'Link': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Link']
    'Base': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Base']
    'Title': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Title']
    'Meta': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Meta']
    'Style': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Style']
    'Head': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Head']
    'Html': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Html']
    'Body': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Body']
    'NuxtIsland': typeof import("../node_modules/nuxt/dist/app/components/nuxt-island")['default']
    'NuxtRouteAnnouncer': IslandComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']>
    'NaiveDrawerLink': IslandComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']>
    'NaiveLoadingBar': IslandComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']>
    'NaiveNotification': IslandComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']>
    'NDrawer': IslandComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['NDrawer']>
    'NDrawerContent': IslandComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['NDrawerContent']>
    'NModal': IslandComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['NModal']>
      'LazyRichTextEditor': LazyComponent<typeof import("../components/RichTextEditor.vue")['default']>
    'LazyAppheader': LazyComponent<typeof import("../components/appheader.vue")['default']>
    'LazyArticleToc': LazyComponent<typeof import("../components/articleToc.vue")['default']>
    'LazyBlogcard': LazyComponent<typeof import("../components/blogcard.vue")['default']>
    'LazyCategory': LazyComponent<typeof import("../components/category.vue")['default']>
    'LazyDarkButton': LazyComponent<typeof import("../components/darkButton.vue")['default']>
    'LazyDashboard': LazyComponent<typeof import("../components/dashboard.vue")['default']>
    'LazyHeros': LazyComponent<typeof import("../components/heros.vue")['default']>
    'LazyLinkMessage': LazyComponent<typeof import("../components/linkMessage.vue")['default']>
    'LazyLinks': LazyComponent<typeof import("../components/links.vue")['default']>
    'LazyNotification': LazyComponent<typeof import("../components/notification.vue")['default']>
    'LazyPosts': LazyComponent<typeof import("../components/posts.vue")['default']>
    'LazyReusableSidebar': LazyComponent<typeof import("../components/reusableSidebar.vue")['default']>
    'LazySettingHeadLink': LazyComponent<typeof import("../components/settingHeadLink.vue")['default']>
    'LazySettingLink': LazyComponent<typeof import("../components/settingLink.vue")['default']>
    'LazySettingLsky': LazyComponent<typeof import("../components/settingLsky.vue")['default']>
    'LazySettingRss': LazyComponent<typeof import("../components/settingRss.vue")['default']>
    'LazySettingSeo': LazyComponent<typeof import("../components/settingSeo.vue")['default']>
    'LazySettingUser': LazyComponent<typeof import("../components/settingUser.vue")['default']>
    'LazySettingWelcome': LazyComponent<typeof import("../components/settingWelcome.vue")['default']>
    'LazySettings': LazyComponent<typeof import("../components/settings.vue")['default']>
    'LazySidebar': LazyComponent<typeof import("../components/sidebar.vue")['default']>
    'LazyNuxtWelcome': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/welcome.vue")['default']>
    'LazyNuxtLayout': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-layout")['default']>
    'LazyNuxtErrorBoundary': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-error-boundary")['default']>
    'LazyClientOnly': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/client-only")['default']>
    'LazyDevOnly': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/dev-only")['default']>
    'LazyServerPlaceholder': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']>
    'LazyNuxtLink': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-link")['default']>
    'LazyNuxtLoadingIndicator': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']>
    'LazyNuxtRouteAnnouncer': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']>
    'LazyNuxtImg': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtImg']>
    'LazyNuxtPicture': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtPicture']>
    'LazyNaiveConfig': LazyComponent<typeof import("../node_modules/@bg-dev/nuxt-naiveui/dist/runtime/components/NaiveConfig.vue")['default']>
    'LazyNaiveNavbar': LazyComponent<typeof import("../node_modules/@bg-dev/nuxt-naiveui/dist/runtime/components/NaiveNavbar.vue")['default']>
    'LazyNaiveColorModeSwitch': LazyComponent<typeof import("../node_modules/@bg-dev/nuxt-naiveui/dist/runtime/components/NaiveColorModeSwitch.vue")['default']>
    'LazyNaiveTabbar': LazyComponent<typeof import("../node_modules/@bg-dev/nuxt-naiveui/dist/runtime/components/NaiveTabbar.vue")['default']>
    'LazyNaiveMenuLink': LazyComponent<typeof import("../node_modules/@bg-dev/nuxt-naiveui/dist/runtime/components/NaiveMenuLink.vue")['default']>
    'LazyNaiveLayoutSidebar': LazyComponent<typeof import("../node_modules/@bg-dev/nuxt-naiveui/dist/runtime/components/NaiveLayoutSidebar.vue")['default']>
    'LazyNaiveLayoutNavbar': LazyComponent<typeof import("../node_modules/@bg-dev/nuxt-naiveui/dist/runtime/components/NaiveLayoutNavbar.vue")['default']>
    'LazyNaiveDrawerLink': LazyComponent<typeof import("../node_modules/@bg-dev/nuxt-naiveui/dist/runtime/components/NaiveDrawerLink.client.vue")['default']>
    'LazyNaiveLoadingBar': LazyComponent<typeof import("../node_modules/@bg-dev/nuxt-naiveui/dist/runtime/components/NaiveLoadingBar.client.vue")['default']>
    'LazyNaiveNotification': LazyComponent<typeof import("../node_modules/@bg-dev/nuxt-naiveui/dist/runtime/components/NaiveNotification.client.vue")['default']>
    'LazyNaiveIcon': LazyComponent<typeof import("../node_modules/@bg-dev/nuxt-naiveui/dist/runtime/components/NaiveIcon.vue")['default']>
    'LazyNThemeEditor': LazyComponent<typeof import("naive-ui")['NThemeEditor']>
    'LazyNAffix': LazyComponent<typeof import("naive-ui")['NAffix']>
    'LazyNAlert': LazyComponent<typeof import("naive-ui")['NAlert']>
    'LazyNAnchor': LazyComponent<typeof import("naive-ui")['NAnchor']>
    'LazyNAnchorLink': LazyComponent<typeof import("naive-ui")['NAnchorLink']>
    'LazyNAutoComplete': LazyComponent<typeof import("naive-ui")['NAutoComplete']>
    'LazyNAvatar': LazyComponent<typeof import("naive-ui")['NAvatar']>
    'LazyNAvatarGroup': LazyComponent<typeof import("naive-ui")['NAvatarGroup']>
    'LazyNBackTop': LazyComponent<typeof import("naive-ui")['NBackTop']>
    'LazyNBadge': LazyComponent<typeof import("naive-ui")['NBadge']>
    'LazyNBreadcrumb': LazyComponent<typeof import("naive-ui")['NBreadcrumb']>
    'LazyNBreadcrumbItem': LazyComponent<typeof import("naive-ui")['NBreadcrumbItem']>
    'LazyNButton': LazyComponent<typeof import("naive-ui")['NButton']>
    'LazyNButtonGroup': LazyComponent<typeof import("naive-ui")['NButtonGroup']>
    'LazyNCalendar': LazyComponent<typeof import("naive-ui")['NCalendar']>
    'LazyNCard': LazyComponent<typeof import("naive-ui")['NCard']>
    'LazyNCarousel': LazyComponent<typeof import("naive-ui")['NCarousel']>
    'LazyNCarouselItem': LazyComponent<typeof import("naive-ui")['NCarouselItem']>
    'LazyNCascader': LazyComponent<typeof import("naive-ui")['NCascader']>
    'LazyNCheckbox': LazyComponent<typeof import("naive-ui")['NCheckbox']>
    'LazyNCheckboxGroup': LazyComponent<typeof import("naive-ui")['NCheckboxGroup']>
    'LazyNCode': LazyComponent<typeof import("naive-ui")['NCode']>
    'LazyNCollapse': LazyComponent<typeof import("naive-ui")['NCollapse']>
    'LazyNCollapseItem': LazyComponent<typeof import("naive-ui")['NCollapseItem']>
    'LazyNCollapseTransition': LazyComponent<typeof import("naive-ui")['NCollapseTransition']>
    'LazyNColorPicker': LazyComponent<typeof import("naive-ui")['NColorPicker']>
    'LazyNConfigProvider': LazyComponent<typeof import("naive-ui")['NConfigProvider']>
    'LazyNCountdown': LazyComponent<typeof import("naive-ui")['NCountdown']>
    'LazyNDataTable': LazyComponent<typeof import("naive-ui")['NDataTable']>
    'LazyNDatePicker': LazyComponent<typeof import("naive-ui")['NDatePicker']>
    'LazyNDescriptions': LazyComponent<typeof import("naive-ui")['NDescriptions']>
    'LazyNDescriptionsItem': LazyComponent<typeof import("naive-ui")['NDescriptionsItem']>
    'LazyNDialog': LazyComponent<typeof import("naive-ui")['NDialog']>
    'LazyNDialogProvider': LazyComponent<typeof import("naive-ui")['NDialogProvider']>
    'LazyNDivider': LazyComponent<typeof import("naive-ui")['NDivider']>
    'LazyNDrawer': LazyComponent<typeof import("naive-ui")['NDrawer']>
    'LazyNDrawerContent': LazyComponent<typeof import("naive-ui")['NDrawerContent']>
    'LazyNDropdown': LazyComponent<typeof import("naive-ui")['NDropdown']>
    'LazyNDynamicInput': LazyComponent<typeof import("naive-ui")['NDynamicInput']>
    'LazyNDynamicTags': LazyComponent<typeof import("naive-ui")['NDynamicTags']>
    'LazyNElement': LazyComponent<typeof import("naive-ui")['NElement']>
    'LazyNEl': LazyComponent<typeof import("naive-ui")['NEl']>
    'LazyNEllipsis': LazyComponent<typeof import("naive-ui")['NEllipsis']>
    'LazyNPerformantEllipsis': LazyComponent<typeof import("naive-ui")['NPerformantEllipsis']>
    'LazyNEmpty': LazyComponent<typeof import("naive-ui")['NEmpty']>
    'LazyNEquation': LazyComponent<typeof import("naive-ui")['NEquation']>
    'LazyNFlex': LazyComponent<typeof import("naive-ui")['NFlex']>
    'LazyNFloatButton': LazyComponent<typeof import("naive-ui")['NFloatButton']>
    'LazyNFloatButtonGroup': LazyComponent<typeof import("naive-ui")['NFloatButtonGroup']>
    'LazyNForm': LazyComponent<typeof import("naive-ui")['NForm']>
    'LazyNFormItem': LazyComponent<typeof import("naive-ui")['NFormItem']>
    'LazyNFormItemCol': LazyComponent<typeof import("naive-ui")['NFormItemCol']>
    'LazyNFormItemGi': LazyComponent<typeof import("naive-ui")['NFormItemGi']>
    'LazyNFormItemGridItem': LazyComponent<typeof import("naive-ui")['NFormItemGridItem']>
    'LazyNFormItemRow': LazyComponent<typeof import("naive-ui")['NFormItemRow']>
    'LazyNGlobalStyle': LazyComponent<typeof import("naive-ui")['NGlobalStyle']>
    'LazyNGradientText': LazyComponent<typeof import("naive-ui")['NGradientText']>
    'LazyNGrid': LazyComponent<typeof import("naive-ui")['NGrid']>
    'LazyNGridItem': LazyComponent<typeof import("naive-ui")['NGridItem']>
    'LazyNGi': LazyComponent<typeof import("naive-ui")['NGi']>
    'LazyNHighlight': LazyComponent<typeof import("naive-ui")['NHighlight']>
    'LazyNIcon': LazyComponent<typeof import("naive-ui")['NIcon']>
    'LazyNIconWrapper': LazyComponent<typeof import("naive-ui")['NIconWrapper']>
    'LazyNImage': LazyComponent<typeof import("naive-ui")['NImage']>
    'LazyNImageGroup': LazyComponent<typeof import("naive-ui")['NImageGroup']>
    'LazyNInfiniteScroll': LazyComponent<typeof import("naive-ui")['NInfiniteScroll']>
    'LazyNInput': LazyComponent<typeof import("naive-ui")['NInput']>
    'LazyNInputGroup': LazyComponent<typeof import("naive-ui")['NInputGroup']>
    'LazyNInputGroupLabel': LazyComponent<typeof import("naive-ui")['NInputGroupLabel']>
    'LazyNInputNumber': LazyComponent<typeof import("naive-ui")['NInputNumber']>
    'LazyNLayout': LazyComponent<typeof import("naive-ui")['NLayout']>
    'LazyNLayoutContent': LazyComponent<typeof import("naive-ui")['NLayoutContent']>
    'LazyNLayoutFooter': LazyComponent<typeof import("naive-ui")['NLayoutFooter']>
    'LazyNLayoutHeader': LazyComponent<typeof import("naive-ui")['NLayoutHeader']>
    'LazyNLayoutSider': LazyComponent<typeof import("naive-ui")['NLayoutSider']>
    'LazyNCol': LazyComponent<typeof import("naive-ui")['NCol']>
    'LazyNRow': LazyComponent<typeof import("naive-ui")['NRow']>
    'LazyNLegacyTransfer': LazyComponent<typeof import("naive-ui")['NLegacyTransfer']>
    'LazyNList': LazyComponent<typeof import("naive-ui")['NList']>
    'LazyNListItem': LazyComponent<typeof import("naive-ui")['NListItem']>
    'LazyNLoadingBarProvider': LazyComponent<typeof import("naive-ui")['NLoadingBarProvider']>
    'LazyNLog': LazyComponent<typeof import("naive-ui")['NLog']>
    'LazyNMarquee': LazyComponent<typeof import("naive-ui")['NMarquee']>
    'LazyNMention': LazyComponent<typeof import("naive-ui")['NMention']>
    'LazyNMenu': LazyComponent<typeof import("naive-ui")['NMenu']>
    'LazyNMessageProvider': LazyComponent<typeof import("naive-ui")['NMessageProvider']>
    'LazyNModal': LazyComponent<typeof import("naive-ui")['NModal']>
    'LazyNModalProvider': LazyComponent<typeof import("naive-ui")['NModalProvider']>
    'LazyNNotificationProvider': LazyComponent<typeof import("naive-ui")['NNotificationProvider']>
    'LazyNNumberAnimation': LazyComponent<typeof import("naive-ui")['NNumberAnimation']>
    'LazyNPageHeader': LazyComponent<typeof import("naive-ui")['NPageHeader']>
    'LazyNPagination': LazyComponent<typeof import("naive-ui")['NPagination']>
    'LazyNPopconfirm': LazyComponent<typeof import("naive-ui")['NPopconfirm']>
    'LazyNPopover': LazyComponent<typeof import("naive-ui")['NPopover']>
    'LazyNPopselect': LazyComponent<typeof import("naive-ui")['NPopselect']>
    'LazyNProgress': LazyComponent<typeof import("naive-ui")['NProgress']>
    'LazyNQrCode': LazyComponent<typeof import("naive-ui")['NQrCode']>
    'LazyNRadio': LazyComponent<typeof import("naive-ui")['NRadio']>
    'LazyNRadioButton': LazyComponent<typeof import("naive-ui")['NRadioButton']>
    'LazyNRadioGroup': LazyComponent<typeof import("naive-ui")['NRadioGroup']>
    'LazyNRate': LazyComponent<typeof import("naive-ui")['NRate']>
    'LazyNResult': LazyComponent<typeof import("naive-ui")['NResult']>
    'LazyNScrollbar': LazyComponent<typeof import("naive-ui")['NScrollbar']>
    'LazyNSelect': LazyComponent<typeof import("naive-ui")['NSelect']>
    'LazyNSkeleton': LazyComponent<typeof import("naive-ui")['NSkeleton']>
    'LazyNSlider': LazyComponent<typeof import("naive-ui")['NSlider']>
    'LazyNSpace': LazyComponent<typeof import("naive-ui")['NSpace']>
    'LazyNSpin': LazyComponent<typeof import("naive-ui")['NSpin']>
    'LazyNSplit': LazyComponent<typeof import("naive-ui")['NSplit']>
    'LazyNStatistic': LazyComponent<typeof import("naive-ui")['NStatistic']>
    'LazyNStep': LazyComponent<typeof import("naive-ui")['NStep']>
    'LazyNSteps': LazyComponent<typeof import("naive-ui")['NSteps']>
    'LazyNSwitch': LazyComponent<typeof import("naive-ui")['NSwitch']>
    'LazyNTable': LazyComponent<typeof import("naive-ui")['NTable']>
    'LazyNTbody': LazyComponent<typeof import("naive-ui")['NTbody']>
    'LazyNTd': LazyComponent<typeof import("naive-ui")['NTd']>
    'LazyNTh': LazyComponent<typeof import("naive-ui")['NTh']>
    'LazyNThead': LazyComponent<typeof import("naive-ui")['NThead']>
    'LazyNTr': LazyComponent<typeof import("naive-ui")['NTr']>
    'LazyNTab': LazyComponent<typeof import("naive-ui")['NTab']>
    'LazyNTabPane': LazyComponent<typeof import("naive-ui")['NTabPane']>
    'LazyNTabs': LazyComponent<typeof import("naive-ui")['NTabs']>
    'LazyNTag': LazyComponent<typeof import("naive-ui")['NTag']>
    'LazyNThing': LazyComponent<typeof import("naive-ui")['NThing']>
    'LazyNTime': LazyComponent<typeof import("naive-ui")['NTime']>
    'LazyNTimePicker': LazyComponent<typeof import("naive-ui")['NTimePicker']>
    'LazyNTimeline': LazyComponent<typeof import("naive-ui")['NTimeline']>
    'LazyNTimelineItem': LazyComponent<typeof import("naive-ui")['NTimelineItem']>
    'LazyNTooltip': LazyComponent<typeof import("naive-ui")['NTooltip']>
    'LazyNTransfer': LazyComponent<typeof import("naive-ui")['NTransfer']>
    'LazyNTree': LazyComponent<typeof import("naive-ui")['NTree']>
    'LazyNTreeSelect': LazyComponent<typeof import("naive-ui")['NTreeSelect']>
    'LazyNA': LazyComponent<typeof import("naive-ui")['NA']>
    'LazyNBlockquote': LazyComponent<typeof import("naive-ui")['NBlockquote']>
    'LazyNH1': LazyComponent<typeof import("naive-ui")['NH1']>
    'LazyNH2': LazyComponent<typeof import("naive-ui")['NH2']>
    'LazyNH3': LazyComponent<typeof import("naive-ui")['NH3']>
    'LazyNH4': LazyComponent<typeof import("naive-ui")['NH4']>
    'LazyNH5': LazyComponent<typeof import("naive-ui")['NH5']>
    'LazyNH6': LazyComponent<typeof import("naive-ui")['NH6']>
    'LazyNHr': LazyComponent<typeof import("naive-ui")['NHr']>
    'LazyNLi': LazyComponent<typeof import("naive-ui")['NLi']>
    'LazyNOl': LazyComponent<typeof import("naive-ui")['NOl']>
    'LazyNP': LazyComponent<typeof import("naive-ui")['NP']>
    'LazyNText': LazyComponent<typeof import("naive-ui")['NText']>
    'LazyNUl': LazyComponent<typeof import("naive-ui")['NUl']>
    'LazyNUpload': LazyComponent<typeof import("naive-ui")['NUpload']>
    'LazyNUploadDragger': LazyComponent<typeof import("naive-ui")['NUploadDragger']>
    'LazyNUploadFileList': LazyComponent<typeof import("naive-ui")['NUploadFileList']>
    'LazyNUploadTrigger': LazyComponent<typeof import("naive-ui")['NUploadTrigger']>
    'LazyNVirtualList': LazyComponent<typeof import("naive-ui")['NVirtualList']>
    'LazyNWatermark': LazyComponent<typeof import("naive-ui")['NWatermark']>
    'LazyColorScheme': LazyComponent<typeof import("../node_modules/@nuxtjs/color-mode/dist/runtime/component.vue3.vue")['default']>
    'LazyNuxtPage': LazyComponent<typeof import("../node_modules/nuxt/dist/pages/runtime/page")['default']>
    'LazyNoScript': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['NoScript']>
    'LazyLink': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Link']>
    'LazyBase': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Base']>
    'LazyTitle': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Title']>
    'LazyMeta': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Meta']>
    'LazyStyle': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Style']>
    'LazyHead': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Head']>
    'LazyHtml': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Html']>
    'LazyBody': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Body']>
    'LazyNuxtIsland': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-island")['default']>
    'LazyNuxtRouteAnnouncer': LazyComponent<IslandComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']>>
    'LazyNaiveDrawerLink': LazyComponent<IslandComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']>>
    'LazyNaiveLoadingBar': LazyComponent<IslandComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']>>
    'LazyNaiveNotification': LazyComponent<IslandComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']>>
    'LazyNDrawer': LazyComponent<IslandComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['NDrawer']>>
    'LazyNDrawerContent': LazyComponent<IslandComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['NDrawerContent']>>
    'LazyNModal': LazyComponent<IslandComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['NModal']>>
}

declare module 'vue' {
  export interface GlobalComponents extends _GlobalComponents { }
}

export const RichTextEditor: typeof import("../components/RichTextEditor.vue")['default']
export const Appheader: typeof import("../components/appheader.vue")['default']
export const ArticleToc: typeof import("../components/articleToc.vue")['default']
export const Blogcard: typeof import("../components/blogcard.vue")['default']
export const Category: typeof import("../components/category.vue")['default']
export const DarkButton: typeof import("../components/darkButton.vue")['default']
export const Dashboard: typeof import("../components/dashboard.vue")['default']
export const Heros: typeof import("../components/heros.vue")['default']
export const LinkMessage: typeof import("../components/linkMessage.vue")['default']
export const Links: typeof import("../components/links.vue")['default']
export const Notification: typeof import("../components/notification.vue")['default']
export const Posts: typeof import("../components/posts.vue")['default']
export const ReusableSidebar: typeof import("../components/reusableSidebar.vue")['default']
export const SettingHeadLink: typeof import("../components/settingHeadLink.vue")['default']
export const SettingLink: typeof import("../components/settingLink.vue")['default']
export const SettingLsky: typeof import("../components/settingLsky.vue")['default']
export const SettingRss: typeof import("../components/settingRss.vue")['default']
export const SettingSeo: typeof import("../components/settingSeo.vue")['default']
export const SettingUser: typeof import("../components/settingUser.vue")['default']
export const SettingWelcome: typeof import("../components/settingWelcome.vue")['default']
export const Settings: typeof import("../components/settings.vue")['default']
export const Sidebar: typeof import("../components/sidebar.vue")['default']
export const NuxtWelcome: typeof import("../node_modules/nuxt/dist/app/components/welcome.vue")['default']
export const NuxtLayout: typeof import("../node_modules/nuxt/dist/app/components/nuxt-layout")['default']
export const NuxtErrorBoundary: typeof import("../node_modules/nuxt/dist/app/components/nuxt-error-boundary")['default']
export const ClientOnly: typeof import("../node_modules/nuxt/dist/app/components/client-only")['default']
export const DevOnly: typeof import("../node_modules/nuxt/dist/app/components/dev-only")['default']
export const ServerPlaceholder: typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']
export const NuxtLink: typeof import("../node_modules/nuxt/dist/app/components/nuxt-link")['default']
export const NuxtLoadingIndicator: typeof import("../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']
export const NuxtRouteAnnouncer: typeof import("../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']
export const NuxtImg: typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtImg']
export const NuxtPicture: typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtPicture']
export const NaiveConfig: typeof import("../node_modules/@bg-dev/nuxt-naiveui/dist/runtime/components/NaiveConfig.vue")['default']
export const NaiveNavbar: typeof import("../node_modules/@bg-dev/nuxt-naiveui/dist/runtime/components/NaiveNavbar.vue")['default']
export const NaiveColorModeSwitch: typeof import("../node_modules/@bg-dev/nuxt-naiveui/dist/runtime/components/NaiveColorModeSwitch.vue")['default']
export const NaiveTabbar: typeof import("../node_modules/@bg-dev/nuxt-naiveui/dist/runtime/components/NaiveTabbar.vue")['default']
export const NaiveMenuLink: typeof import("../node_modules/@bg-dev/nuxt-naiveui/dist/runtime/components/NaiveMenuLink.vue")['default']
export const NaiveLayoutSidebar: typeof import("../node_modules/@bg-dev/nuxt-naiveui/dist/runtime/components/NaiveLayoutSidebar.vue")['default']
export const NaiveLayoutNavbar: typeof import("../node_modules/@bg-dev/nuxt-naiveui/dist/runtime/components/NaiveLayoutNavbar.vue")['default']
export const NaiveDrawerLink: typeof import("../node_modules/@bg-dev/nuxt-naiveui/dist/runtime/components/NaiveDrawerLink.client.vue")['default']
export const NaiveLoadingBar: typeof import("../node_modules/@bg-dev/nuxt-naiveui/dist/runtime/components/NaiveLoadingBar.client.vue")['default']
export const NaiveNotification: typeof import("../node_modules/@bg-dev/nuxt-naiveui/dist/runtime/components/NaiveNotification.client.vue")['default']
export const NaiveIcon: typeof import("../node_modules/@bg-dev/nuxt-naiveui/dist/runtime/components/NaiveIcon.vue")['default']
export const NThemeEditor: typeof import("naive-ui")['NThemeEditor']
export const NAffix: typeof import("naive-ui")['NAffix']
export const NAlert: typeof import("naive-ui")['NAlert']
export const NAnchor: typeof import("naive-ui")['NAnchor']
export const NAnchorLink: typeof import("naive-ui")['NAnchorLink']
export const NAutoComplete: typeof import("naive-ui")['NAutoComplete']
export const NAvatar: typeof import("naive-ui")['NAvatar']
export const NAvatarGroup: typeof import("naive-ui")['NAvatarGroup']
export const NBackTop: typeof import("naive-ui")['NBackTop']
export const NBadge: typeof import("naive-ui")['NBadge']
export const NBreadcrumb: typeof import("naive-ui")['NBreadcrumb']
export const NBreadcrumbItem: typeof import("naive-ui")['NBreadcrumbItem']
export const NButton: typeof import("naive-ui")['NButton']
export const NButtonGroup: typeof import("naive-ui")['NButtonGroup']
export const NCalendar: typeof import("naive-ui")['NCalendar']
export const NCard: typeof import("naive-ui")['NCard']
export const NCarousel: typeof import("naive-ui")['NCarousel']
export const NCarouselItem: typeof import("naive-ui")['NCarouselItem']
export const NCascader: typeof import("naive-ui")['NCascader']
export const NCheckbox: typeof import("naive-ui")['NCheckbox']
export const NCheckboxGroup: typeof import("naive-ui")['NCheckboxGroup']
export const NCode: typeof import("naive-ui")['NCode']
export const NCollapse: typeof import("naive-ui")['NCollapse']
export const NCollapseItem: typeof import("naive-ui")['NCollapseItem']
export const NCollapseTransition: typeof import("naive-ui")['NCollapseTransition']
export const NColorPicker: typeof import("naive-ui")['NColorPicker']
export const NConfigProvider: typeof import("naive-ui")['NConfigProvider']
export const NCountdown: typeof import("naive-ui")['NCountdown']
export const NDataTable: typeof import("naive-ui")['NDataTable']
export const NDatePicker: typeof import("naive-ui")['NDatePicker']
export const NDescriptions: typeof import("naive-ui")['NDescriptions']
export const NDescriptionsItem: typeof import("naive-ui")['NDescriptionsItem']
export const NDialog: typeof import("naive-ui")['NDialog']
export const NDialogProvider: typeof import("naive-ui")['NDialogProvider']
export const NDivider: typeof import("naive-ui")['NDivider']
export const NDrawer: typeof import("naive-ui")['NDrawer']
export const NDrawerContent: typeof import("naive-ui")['NDrawerContent']
export const NDropdown: typeof import("naive-ui")['NDropdown']
export const NDynamicInput: typeof import("naive-ui")['NDynamicInput']
export const NDynamicTags: typeof import("naive-ui")['NDynamicTags']
export const NElement: typeof import("naive-ui")['NElement']
export const NEl: typeof import("naive-ui")['NEl']
export const NEllipsis: typeof import("naive-ui")['NEllipsis']
export const NPerformantEllipsis: typeof import("naive-ui")['NPerformantEllipsis']
export const NEmpty: typeof import("naive-ui")['NEmpty']
export const NEquation: typeof import("naive-ui")['NEquation']
export const NFlex: typeof import("naive-ui")['NFlex']
export const NFloatButton: typeof import("naive-ui")['NFloatButton']
export const NFloatButtonGroup: typeof import("naive-ui")['NFloatButtonGroup']
export const NForm: typeof import("naive-ui")['NForm']
export const NFormItem: typeof import("naive-ui")['NFormItem']
export const NFormItemCol: typeof import("naive-ui")['NFormItemCol']
export const NFormItemGi: typeof import("naive-ui")['NFormItemGi']
export const NFormItemGridItem: typeof import("naive-ui")['NFormItemGridItem']
export const NFormItemRow: typeof import("naive-ui")['NFormItemRow']
export const NGlobalStyle: typeof import("naive-ui")['NGlobalStyle']
export const NGradientText: typeof import("naive-ui")['NGradientText']
export const NGrid: typeof import("naive-ui")['NGrid']
export const NGridItem: typeof import("naive-ui")['NGridItem']
export const NGi: typeof import("naive-ui")['NGi']
export const NHighlight: typeof import("naive-ui")['NHighlight']
export const NIcon: typeof import("naive-ui")['NIcon']
export const NIconWrapper: typeof import("naive-ui")['NIconWrapper']
export const NImage: typeof import("naive-ui")['NImage']
export const NImageGroup: typeof import("naive-ui")['NImageGroup']
export const NInfiniteScroll: typeof import("naive-ui")['NInfiniteScroll']
export const NInput: typeof import("naive-ui")['NInput']
export const NInputGroup: typeof import("naive-ui")['NInputGroup']
export const NInputGroupLabel: typeof import("naive-ui")['NInputGroupLabel']
export const NInputNumber: typeof import("naive-ui")['NInputNumber']
export const NLayout: typeof import("naive-ui")['NLayout']
export const NLayoutContent: typeof import("naive-ui")['NLayoutContent']
export const NLayoutFooter: typeof import("naive-ui")['NLayoutFooter']
export const NLayoutHeader: typeof import("naive-ui")['NLayoutHeader']
export const NLayoutSider: typeof import("naive-ui")['NLayoutSider']
export const NCol: typeof import("naive-ui")['NCol']
export const NRow: typeof import("naive-ui")['NRow']
export const NLegacyTransfer: typeof import("naive-ui")['NLegacyTransfer']
export const NList: typeof import("naive-ui")['NList']
export const NListItem: typeof import("naive-ui")['NListItem']
export const NLoadingBarProvider: typeof import("naive-ui")['NLoadingBarProvider']
export const NLog: typeof import("naive-ui")['NLog']
export const NMarquee: typeof import("naive-ui")['NMarquee']
export const NMention: typeof import("naive-ui")['NMention']
export const NMenu: typeof import("naive-ui")['NMenu']
export const NMessageProvider: typeof import("naive-ui")['NMessageProvider']
export const NModal: typeof import("naive-ui")['NModal']
export const NModalProvider: typeof import("naive-ui")['NModalProvider']
export const NNotificationProvider: typeof import("naive-ui")['NNotificationProvider']
export const NNumberAnimation: typeof import("naive-ui")['NNumberAnimation']
export const NPageHeader: typeof import("naive-ui")['NPageHeader']
export const NPagination: typeof import("naive-ui")['NPagination']
export const NPopconfirm: typeof import("naive-ui")['NPopconfirm']
export const NPopover: typeof import("naive-ui")['NPopover']
export const NPopselect: typeof import("naive-ui")['NPopselect']
export const NProgress: typeof import("naive-ui")['NProgress']
export const NQrCode: typeof import("naive-ui")['NQrCode']
export const NRadio: typeof import("naive-ui")['NRadio']
export const NRadioButton: typeof import("naive-ui")['NRadioButton']
export const NRadioGroup: typeof import("naive-ui")['NRadioGroup']
export const NRate: typeof import("naive-ui")['NRate']
export const NResult: typeof import("naive-ui")['NResult']
export const NScrollbar: typeof import("naive-ui")['NScrollbar']
export const NSelect: typeof import("naive-ui")['NSelect']
export const NSkeleton: typeof import("naive-ui")['NSkeleton']
export const NSlider: typeof import("naive-ui")['NSlider']
export const NSpace: typeof import("naive-ui")['NSpace']
export const NSpin: typeof import("naive-ui")['NSpin']
export const NSplit: typeof import("naive-ui")['NSplit']
export const NStatistic: typeof import("naive-ui")['NStatistic']
export const NStep: typeof import("naive-ui")['NStep']
export const NSteps: typeof import("naive-ui")['NSteps']
export const NSwitch: typeof import("naive-ui")['NSwitch']
export const NTable: typeof import("naive-ui")['NTable']
export const NTbody: typeof import("naive-ui")['NTbody']
export const NTd: typeof import("naive-ui")['NTd']
export const NTh: typeof import("naive-ui")['NTh']
export const NThead: typeof import("naive-ui")['NThead']
export const NTr: typeof import("naive-ui")['NTr']
export const NTab: typeof import("naive-ui")['NTab']
export const NTabPane: typeof import("naive-ui")['NTabPane']
export const NTabs: typeof import("naive-ui")['NTabs']
export const NTag: typeof import("naive-ui")['NTag']
export const NThing: typeof import("naive-ui")['NThing']
export const NTime: typeof import("naive-ui")['NTime']
export const NTimePicker: typeof import("naive-ui")['NTimePicker']
export const NTimeline: typeof import("naive-ui")['NTimeline']
export const NTimelineItem: typeof import("naive-ui")['NTimelineItem']
export const NTooltip: typeof import("naive-ui")['NTooltip']
export const NTransfer: typeof import("naive-ui")['NTransfer']
export const NTree: typeof import("naive-ui")['NTree']
export const NTreeSelect: typeof import("naive-ui")['NTreeSelect']
export const NA: typeof import("naive-ui")['NA']
export const NBlockquote: typeof import("naive-ui")['NBlockquote']
export const NH1: typeof import("naive-ui")['NH1']
export const NH2: typeof import("naive-ui")['NH2']
export const NH3: typeof import("naive-ui")['NH3']
export const NH4: typeof import("naive-ui")['NH4']
export const NH5: typeof import("naive-ui")['NH5']
export const NH6: typeof import("naive-ui")['NH6']
export const NHr: typeof import("naive-ui")['NHr']
export const NLi: typeof import("naive-ui")['NLi']
export const NOl: typeof import("naive-ui")['NOl']
export const NP: typeof import("naive-ui")['NP']
export const NText: typeof import("naive-ui")['NText']
export const NUl: typeof import("naive-ui")['NUl']
export const NUpload: typeof import("naive-ui")['NUpload']
export const NUploadDragger: typeof import("naive-ui")['NUploadDragger']
export const NUploadFileList: typeof import("naive-ui")['NUploadFileList']
export const NUploadTrigger: typeof import("naive-ui")['NUploadTrigger']
export const NVirtualList: typeof import("naive-ui")['NVirtualList']
export const NWatermark: typeof import("naive-ui")['NWatermark']
export const ColorScheme: typeof import("../node_modules/@nuxtjs/color-mode/dist/runtime/component.vue3.vue")['default']
export const NuxtPage: typeof import("../node_modules/nuxt/dist/pages/runtime/page")['default']
export const NoScript: typeof import("../node_modules/nuxt/dist/head/runtime/components")['NoScript']
export const Link: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Link']
export const Base: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Base']
export const Title: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Title']
export const Meta: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Meta']
export const Style: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Style']
export const Head: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Head']
export const Html: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Html']
export const Body: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Body']
export const NuxtIsland: typeof import("../node_modules/nuxt/dist/app/components/nuxt-island")['default']
export const NuxtRouteAnnouncer: IslandComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']>
export const NaiveDrawerLink: IslandComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']>
export const NaiveLoadingBar: IslandComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']>
export const NaiveNotification: IslandComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']>
export const NDrawer: IslandComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['NDrawer']>
export const NDrawerContent: IslandComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['NDrawerContent']>
export const NModal: IslandComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['NModal']>
export const LazyRichTextEditor: LazyComponent<typeof import("../components/RichTextEditor.vue")['default']>
export const LazyAppheader: LazyComponent<typeof import("../components/appheader.vue")['default']>
export const LazyArticleToc: LazyComponent<typeof import("../components/articleToc.vue")['default']>
export const LazyBlogcard: LazyComponent<typeof import("../components/blogcard.vue")['default']>
export const LazyCategory: LazyComponent<typeof import("../components/category.vue")['default']>
export const LazyDarkButton: LazyComponent<typeof import("../components/darkButton.vue")['default']>
export const LazyDashboard: LazyComponent<typeof import("../components/dashboard.vue")['default']>
export const LazyHeros: LazyComponent<typeof import("../components/heros.vue")['default']>
export const LazyLinkMessage: LazyComponent<typeof import("../components/linkMessage.vue")['default']>
export const LazyLinks: LazyComponent<typeof import("../components/links.vue")['default']>
export const LazyNotification: LazyComponent<typeof import("../components/notification.vue")['default']>
export const LazyPosts: LazyComponent<typeof import("../components/posts.vue")['default']>
export const LazyReusableSidebar: LazyComponent<typeof import("../components/reusableSidebar.vue")['default']>
export const LazySettingHeadLink: LazyComponent<typeof import("../components/settingHeadLink.vue")['default']>
export const LazySettingLink: LazyComponent<typeof import("../components/settingLink.vue")['default']>
export const LazySettingLsky: LazyComponent<typeof import("../components/settingLsky.vue")['default']>
export const LazySettingRss: LazyComponent<typeof import("../components/settingRss.vue")['default']>
export const LazySettingSeo: LazyComponent<typeof import("../components/settingSeo.vue")['default']>
export const LazySettingUser: LazyComponent<typeof import("../components/settingUser.vue")['default']>
export const LazySettingWelcome: LazyComponent<typeof import("../components/settingWelcome.vue")['default']>
export const LazySettings: LazyComponent<typeof import("../components/settings.vue")['default']>
export const LazySidebar: LazyComponent<typeof import("../components/sidebar.vue")['default']>
export const LazyNuxtWelcome: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/welcome.vue")['default']>
export const LazyNuxtLayout: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-layout")['default']>
export const LazyNuxtErrorBoundary: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-error-boundary")['default']>
export const LazyClientOnly: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/client-only")['default']>
export const LazyDevOnly: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/dev-only")['default']>
export const LazyServerPlaceholder: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']>
export const LazyNuxtLink: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-link")['default']>
export const LazyNuxtLoadingIndicator: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']>
export const LazyNuxtRouteAnnouncer: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']>
export const LazyNuxtImg: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtImg']>
export const LazyNuxtPicture: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtPicture']>
export const LazyNaiveConfig: LazyComponent<typeof import("../node_modules/@bg-dev/nuxt-naiveui/dist/runtime/components/NaiveConfig.vue")['default']>
export const LazyNaiveNavbar: LazyComponent<typeof import("../node_modules/@bg-dev/nuxt-naiveui/dist/runtime/components/NaiveNavbar.vue")['default']>
export const LazyNaiveColorModeSwitch: LazyComponent<typeof import("../node_modules/@bg-dev/nuxt-naiveui/dist/runtime/components/NaiveColorModeSwitch.vue")['default']>
export const LazyNaiveTabbar: LazyComponent<typeof import("../node_modules/@bg-dev/nuxt-naiveui/dist/runtime/components/NaiveTabbar.vue")['default']>
export const LazyNaiveMenuLink: LazyComponent<typeof import("../node_modules/@bg-dev/nuxt-naiveui/dist/runtime/components/NaiveMenuLink.vue")['default']>
export const LazyNaiveLayoutSidebar: LazyComponent<typeof import("../node_modules/@bg-dev/nuxt-naiveui/dist/runtime/components/NaiveLayoutSidebar.vue")['default']>
export const LazyNaiveLayoutNavbar: LazyComponent<typeof import("../node_modules/@bg-dev/nuxt-naiveui/dist/runtime/components/NaiveLayoutNavbar.vue")['default']>
export const LazyNaiveDrawerLink: LazyComponent<typeof import("../node_modules/@bg-dev/nuxt-naiveui/dist/runtime/components/NaiveDrawerLink.client.vue")['default']>
export const LazyNaiveLoadingBar: LazyComponent<typeof import("../node_modules/@bg-dev/nuxt-naiveui/dist/runtime/components/NaiveLoadingBar.client.vue")['default']>
export const LazyNaiveNotification: LazyComponent<typeof import("../node_modules/@bg-dev/nuxt-naiveui/dist/runtime/components/NaiveNotification.client.vue")['default']>
export const LazyNaiveIcon: LazyComponent<typeof import("../node_modules/@bg-dev/nuxt-naiveui/dist/runtime/components/NaiveIcon.vue")['default']>
export const LazyNThemeEditor: LazyComponent<typeof import("naive-ui")['NThemeEditor']>
export const LazyNAffix: LazyComponent<typeof import("naive-ui")['NAffix']>
export const LazyNAlert: LazyComponent<typeof import("naive-ui")['NAlert']>
export const LazyNAnchor: LazyComponent<typeof import("naive-ui")['NAnchor']>
export const LazyNAnchorLink: LazyComponent<typeof import("naive-ui")['NAnchorLink']>
export const LazyNAutoComplete: LazyComponent<typeof import("naive-ui")['NAutoComplete']>
export const LazyNAvatar: LazyComponent<typeof import("naive-ui")['NAvatar']>
export const LazyNAvatarGroup: LazyComponent<typeof import("naive-ui")['NAvatarGroup']>
export const LazyNBackTop: LazyComponent<typeof import("naive-ui")['NBackTop']>
export const LazyNBadge: LazyComponent<typeof import("naive-ui")['NBadge']>
export const LazyNBreadcrumb: LazyComponent<typeof import("naive-ui")['NBreadcrumb']>
export const LazyNBreadcrumbItem: LazyComponent<typeof import("naive-ui")['NBreadcrumbItem']>
export const LazyNButton: LazyComponent<typeof import("naive-ui")['NButton']>
export const LazyNButtonGroup: LazyComponent<typeof import("naive-ui")['NButtonGroup']>
export const LazyNCalendar: LazyComponent<typeof import("naive-ui")['NCalendar']>
export const LazyNCard: LazyComponent<typeof import("naive-ui")['NCard']>
export const LazyNCarousel: LazyComponent<typeof import("naive-ui")['NCarousel']>
export const LazyNCarouselItem: LazyComponent<typeof import("naive-ui")['NCarouselItem']>
export const LazyNCascader: LazyComponent<typeof import("naive-ui")['NCascader']>
export const LazyNCheckbox: LazyComponent<typeof import("naive-ui")['NCheckbox']>
export const LazyNCheckboxGroup: LazyComponent<typeof import("naive-ui")['NCheckboxGroup']>
export const LazyNCode: LazyComponent<typeof import("naive-ui")['NCode']>
export const LazyNCollapse: LazyComponent<typeof import("naive-ui")['NCollapse']>
export const LazyNCollapseItem: LazyComponent<typeof import("naive-ui")['NCollapseItem']>
export const LazyNCollapseTransition: LazyComponent<typeof import("naive-ui")['NCollapseTransition']>
export const LazyNColorPicker: LazyComponent<typeof import("naive-ui")['NColorPicker']>
export const LazyNConfigProvider: LazyComponent<typeof import("naive-ui")['NConfigProvider']>
export const LazyNCountdown: LazyComponent<typeof import("naive-ui")['NCountdown']>
export const LazyNDataTable: LazyComponent<typeof import("naive-ui")['NDataTable']>
export const LazyNDatePicker: LazyComponent<typeof import("naive-ui")['NDatePicker']>
export const LazyNDescriptions: LazyComponent<typeof import("naive-ui")['NDescriptions']>
export const LazyNDescriptionsItem: LazyComponent<typeof import("naive-ui")['NDescriptionsItem']>
export const LazyNDialog: LazyComponent<typeof import("naive-ui")['NDialog']>
export const LazyNDialogProvider: LazyComponent<typeof import("naive-ui")['NDialogProvider']>
export const LazyNDivider: LazyComponent<typeof import("naive-ui")['NDivider']>
export const LazyNDrawer: LazyComponent<typeof import("naive-ui")['NDrawer']>
export const LazyNDrawerContent: LazyComponent<typeof import("naive-ui")['NDrawerContent']>
export const LazyNDropdown: LazyComponent<typeof import("naive-ui")['NDropdown']>
export const LazyNDynamicInput: LazyComponent<typeof import("naive-ui")['NDynamicInput']>
export const LazyNDynamicTags: LazyComponent<typeof import("naive-ui")['NDynamicTags']>
export const LazyNElement: LazyComponent<typeof import("naive-ui")['NElement']>
export const LazyNEl: LazyComponent<typeof import("naive-ui")['NEl']>
export const LazyNEllipsis: LazyComponent<typeof import("naive-ui")['NEllipsis']>
export const LazyNPerformantEllipsis: LazyComponent<typeof import("naive-ui")['NPerformantEllipsis']>
export const LazyNEmpty: LazyComponent<typeof import("naive-ui")['NEmpty']>
export const LazyNEquation: LazyComponent<typeof import("naive-ui")['NEquation']>
export const LazyNFlex: LazyComponent<typeof import("naive-ui")['NFlex']>
export const LazyNFloatButton: LazyComponent<typeof import("naive-ui")['NFloatButton']>
export const LazyNFloatButtonGroup: LazyComponent<typeof import("naive-ui")['NFloatButtonGroup']>
export const LazyNForm: LazyComponent<typeof import("naive-ui")['NForm']>
export const LazyNFormItem: LazyComponent<typeof import("naive-ui")['NFormItem']>
export const LazyNFormItemCol: LazyComponent<typeof import("naive-ui")['NFormItemCol']>
export const LazyNFormItemGi: LazyComponent<typeof import("naive-ui")['NFormItemGi']>
export const LazyNFormItemGridItem: LazyComponent<typeof import("naive-ui")['NFormItemGridItem']>
export const LazyNFormItemRow: LazyComponent<typeof import("naive-ui")['NFormItemRow']>
export const LazyNGlobalStyle: LazyComponent<typeof import("naive-ui")['NGlobalStyle']>
export const LazyNGradientText: LazyComponent<typeof import("naive-ui")['NGradientText']>
export const LazyNGrid: LazyComponent<typeof import("naive-ui")['NGrid']>
export const LazyNGridItem: LazyComponent<typeof import("naive-ui")['NGridItem']>
export const LazyNGi: LazyComponent<typeof import("naive-ui")['NGi']>
export const LazyNHighlight: LazyComponent<typeof import("naive-ui")['NHighlight']>
export const LazyNIcon: LazyComponent<typeof import("naive-ui")['NIcon']>
export const LazyNIconWrapper: LazyComponent<typeof import("naive-ui")['NIconWrapper']>
export const LazyNImage: LazyComponent<typeof import("naive-ui")['NImage']>
export const LazyNImageGroup: LazyComponent<typeof import("naive-ui")['NImageGroup']>
export const LazyNInfiniteScroll: LazyComponent<typeof import("naive-ui")['NInfiniteScroll']>
export const LazyNInput: LazyComponent<typeof import("naive-ui")['NInput']>
export const LazyNInputGroup: LazyComponent<typeof import("naive-ui")['NInputGroup']>
export const LazyNInputGroupLabel: LazyComponent<typeof import("naive-ui")['NInputGroupLabel']>
export const LazyNInputNumber: LazyComponent<typeof import("naive-ui")['NInputNumber']>
export const LazyNLayout: LazyComponent<typeof import("naive-ui")['NLayout']>
export const LazyNLayoutContent: LazyComponent<typeof import("naive-ui")['NLayoutContent']>
export const LazyNLayoutFooter: LazyComponent<typeof import("naive-ui")['NLayoutFooter']>
export const LazyNLayoutHeader: LazyComponent<typeof import("naive-ui")['NLayoutHeader']>
export const LazyNLayoutSider: LazyComponent<typeof import("naive-ui")['NLayoutSider']>
export const LazyNCol: LazyComponent<typeof import("naive-ui")['NCol']>
export const LazyNRow: LazyComponent<typeof import("naive-ui")['NRow']>
export const LazyNLegacyTransfer: LazyComponent<typeof import("naive-ui")['NLegacyTransfer']>
export const LazyNList: LazyComponent<typeof import("naive-ui")['NList']>
export const LazyNListItem: LazyComponent<typeof import("naive-ui")['NListItem']>
export const LazyNLoadingBarProvider: LazyComponent<typeof import("naive-ui")['NLoadingBarProvider']>
export const LazyNLog: LazyComponent<typeof import("naive-ui")['NLog']>
export const LazyNMarquee: LazyComponent<typeof import("naive-ui")['NMarquee']>
export const LazyNMention: LazyComponent<typeof import("naive-ui")['NMention']>
export const LazyNMenu: LazyComponent<typeof import("naive-ui")['NMenu']>
export const LazyNMessageProvider: LazyComponent<typeof import("naive-ui")['NMessageProvider']>
export const LazyNModal: LazyComponent<typeof import("naive-ui")['NModal']>
export const LazyNModalProvider: LazyComponent<typeof import("naive-ui")['NModalProvider']>
export const LazyNNotificationProvider: LazyComponent<typeof import("naive-ui")['NNotificationProvider']>
export const LazyNNumberAnimation: LazyComponent<typeof import("naive-ui")['NNumberAnimation']>
export const LazyNPageHeader: LazyComponent<typeof import("naive-ui")['NPageHeader']>
export const LazyNPagination: LazyComponent<typeof import("naive-ui")['NPagination']>
export const LazyNPopconfirm: LazyComponent<typeof import("naive-ui")['NPopconfirm']>
export const LazyNPopover: LazyComponent<typeof import("naive-ui")['NPopover']>
export const LazyNPopselect: LazyComponent<typeof import("naive-ui")['NPopselect']>
export const LazyNProgress: LazyComponent<typeof import("naive-ui")['NProgress']>
export const LazyNQrCode: LazyComponent<typeof import("naive-ui")['NQrCode']>
export const LazyNRadio: LazyComponent<typeof import("naive-ui")['NRadio']>
export const LazyNRadioButton: LazyComponent<typeof import("naive-ui")['NRadioButton']>
export const LazyNRadioGroup: LazyComponent<typeof import("naive-ui")['NRadioGroup']>
export const LazyNRate: LazyComponent<typeof import("naive-ui")['NRate']>
export const LazyNResult: LazyComponent<typeof import("naive-ui")['NResult']>
export const LazyNScrollbar: LazyComponent<typeof import("naive-ui")['NScrollbar']>
export const LazyNSelect: LazyComponent<typeof import("naive-ui")['NSelect']>
export const LazyNSkeleton: LazyComponent<typeof import("naive-ui")['NSkeleton']>
export const LazyNSlider: LazyComponent<typeof import("naive-ui")['NSlider']>
export const LazyNSpace: LazyComponent<typeof import("naive-ui")['NSpace']>
export const LazyNSpin: LazyComponent<typeof import("naive-ui")['NSpin']>
export const LazyNSplit: LazyComponent<typeof import("naive-ui")['NSplit']>
export const LazyNStatistic: LazyComponent<typeof import("naive-ui")['NStatistic']>
export const LazyNStep: LazyComponent<typeof import("naive-ui")['NStep']>
export const LazyNSteps: LazyComponent<typeof import("naive-ui")['NSteps']>
export const LazyNSwitch: LazyComponent<typeof import("naive-ui")['NSwitch']>
export const LazyNTable: LazyComponent<typeof import("naive-ui")['NTable']>
export const LazyNTbody: LazyComponent<typeof import("naive-ui")['NTbody']>
export const LazyNTd: LazyComponent<typeof import("naive-ui")['NTd']>
export const LazyNTh: LazyComponent<typeof import("naive-ui")['NTh']>
export const LazyNThead: LazyComponent<typeof import("naive-ui")['NThead']>
export const LazyNTr: LazyComponent<typeof import("naive-ui")['NTr']>
export const LazyNTab: LazyComponent<typeof import("naive-ui")['NTab']>
export const LazyNTabPane: LazyComponent<typeof import("naive-ui")['NTabPane']>
export const LazyNTabs: LazyComponent<typeof import("naive-ui")['NTabs']>
export const LazyNTag: LazyComponent<typeof import("naive-ui")['NTag']>
export const LazyNThing: LazyComponent<typeof import("naive-ui")['NThing']>
export const LazyNTime: LazyComponent<typeof import("naive-ui")['NTime']>
export const LazyNTimePicker: LazyComponent<typeof import("naive-ui")['NTimePicker']>
export const LazyNTimeline: LazyComponent<typeof import("naive-ui")['NTimeline']>
export const LazyNTimelineItem: LazyComponent<typeof import("naive-ui")['NTimelineItem']>
export const LazyNTooltip: LazyComponent<typeof import("naive-ui")['NTooltip']>
export const LazyNTransfer: LazyComponent<typeof import("naive-ui")['NTransfer']>
export const LazyNTree: LazyComponent<typeof import("naive-ui")['NTree']>
export const LazyNTreeSelect: LazyComponent<typeof import("naive-ui")['NTreeSelect']>
export const LazyNA: LazyComponent<typeof import("naive-ui")['NA']>
export const LazyNBlockquote: LazyComponent<typeof import("naive-ui")['NBlockquote']>
export const LazyNH1: LazyComponent<typeof import("naive-ui")['NH1']>
export const LazyNH2: LazyComponent<typeof import("naive-ui")['NH2']>
export const LazyNH3: LazyComponent<typeof import("naive-ui")['NH3']>
export const LazyNH4: LazyComponent<typeof import("naive-ui")['NH4']>
export const LazyNH5: LazyComponent<typeof import("naive-ui")['NH5']>
export const LazyNH6: LazyComponent<typeof import("naive-ui")['NH6']>
export const LazyNHr: LazyComponent<typeof import("naive-ui")['NHr']>
export const LazyNLi: LazyComponent<typeof import("naive-ui")['NLi']>
export const LazyNOl: LazyComponent<typeof import("naive-ui")['NOl']>
export const LazyNP: LazyComponent<typeof import("naive-ui")['NP']>
export const LazyNText: LazyComponent<typeof import("naive-ui")['NText']>
export const LazyNUl: LazyComponent<typeof import("naive-ui")['NUl']>
export const LazyNUpload: LazyComponent<typeof import("naive-ui")['NUpload']>
export const LazyNUploadDragger: LazyComponent<typeof import("naive-ui")['NUploadDragger']>
export const LazyNUploadFileList: LazyComponent<typeof import("naive-ui")['NUploadFileList']>
export const LazyNUploadTrigger: LazyComponent<typeof import("naive-ui")['NUploadTrigger']>
export const LazyNVirtualList: LazyComponent<typeof import("naive-ui")['NVirtualList']>
export const LazyNWatermark: LazyComponent<typeof import("naive-ui")['NWatermark']>
export const LazyColorScheme: LazyComponent<typeof import("../node_modules/@nuxtjs/color-mode/dist/runtime/component.vue3.vue")['default']>
export const LazyNuxtPage: LazyComponent<typeof import("../node_modules/nuxt/dist/pages/runtime/page")['default']>
export const LazyNoScript: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['NoScript']>
export const LazyLink: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Link']>
export const LazyBase: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Base']>
export const LazyTitle: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Title']>
export const LazyMeta: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Meta']>
export const LazyStyle: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Style']>
export const LazyHead: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Head']>
export const LazyHtml: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Html']>
export const LazyBody: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Body']>
export const LazyNuxtIsland: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-island")['default']>
export const LazyNuxtRouteAnnouncer: LazyComponent<IslandComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']>>
export const LazyNaiveDrawerLink: LazyComponent<IslandComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']>>
export const LazyNaiveLoadingBar: LazyComponent<IslandComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']>>
export const LazyNaiveNotification: LazyComponent<IslandComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']>>
export const LazyNDrawer: LazyComponent<IslandComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['NDrawer']>>
export const LazyNDrawerContent: LazyComponent<IslandComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['NDrawerContent']>>
export const LazyNModal: LazyComponent<IslandComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['NModal']>>

export const componentNames: string[]
