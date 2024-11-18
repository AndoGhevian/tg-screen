import React from 'react';
import { PropsWithChildren, useEffect } from 'react';
import {
  backButton,
  mainButton,
  settingsButton,
  secondaryButton,
  closingBehavior,
  swipeBehavior,
  viewport,
  MainButtonState,
  SecondaryButtonState,
  useSignal,
  miniApp,
} from '@telegram-apps/sdk-react';

const defaultMainButtonProps: MainButtonState = {
  hasShineEffect: false,
  isEnabled: true,
  isLoaderVisible: false,
  isVisible: false,
  text: 'Main Button',
  backgroundColor: '' as any,
  textColor: '' as any,
}

const defaultSecondaryButtonProps: SecondaryButtonState = {
  hasShineEffect: false,
  isEnabled: true,
  isLoaderVisible: false,
  isVisible: false,
  text: 'Secondary Button',
  position: 'left',
  backgroundColor: '' as any,
  textColor: '' as any,
}

/**
 * Before Use you need to manually mount appropriate components from
 * telegram-apps sdk-react
 * 
 * https://docs.telegram-mini-apps.com/packages/telegram-apps-sdk/2-x/usage-tips#mount-used-components
 */
export function TgScreen({
  children,
  mainButtonProps,
  secondaryButtonProps,
  onBack,
  onSettings,
  closeConfirmation = true,
  autoExpand = true,
  allowSwipeExpand = true,
  backgroundColor,
  headerColor,
  bottomBarColor,
  silentErrors = true,
}: PropsWithChildren<{
  /**
   * https://docs.telegram-mini-apps.com/platform/methods#web-app-setup-main-button
   */
  mainButtonProps?: {
    onClick: () => void
  } & Omit<Partial<MainButtonState>, "isVisible">
  /**
   * https://docs.telegram-mini-apps.com/platform/methods#web-app-setup-secondary-button
   */
  secondaryButtonProps?: {
    onClick: () => void
  } & Omit<Partial<SecondaryButtonState>, "isVisible">
  onBack?: () => void;
  onSettings?: () => void;
  /**
   * Defines if the confirmation dialog should be shown when user tries to close the screen
   * @default true
   */
  closeConfirmation?: boolean;
  /**
   * Defines if the screen should be expanded by default
   * @default true
   */
  autoExpand?: boolean;
  /**
   * If true, allows to expand or close the screen by swiping vertically
   * @default true
   */
  allowSwipeExpand?: boolean;
  /**
   * Can be eather RGB color or allowed theme color_key:
   * https://docs.telegram-mini-apps.com/platform/methods#web-app-set-background-color
   */
  backgroundColor?: string
  /**
   * Can be eather RGB color or allowed theme color_key:
   * https://docs.telegram-mini-apps.com/platform/methods#web-app-set-header-color
   */
  headerColor?: string
  /**
   * Can be eather RGB color or allowed theme color_key:
   * https://docs.telegram-mini-apps.com/platform/methods#web-app-set-bottom-bar-color
   */
  bottomBarColor?: string;
  /**
   * if false original post evet errors will be thrown
   * 
   * NOTE: if silent true, then overrides postEvent property from mini app sdk init() method:
   * https://docs.telegram-mini-apps.com/packages/telegram-apps-sdk/2-x/initializing
   * @default true
   */
  silentErrors?: boolean;
}>) {
  const backButtonOffHandlerRef = React.useRef(() => {})
  const mainButtonOffHandlerRef = React.useRef(() => {})
  const secondaryButtonOffHandlerRef = React.useRef(() => {})
  const settingsButtonOffHandlerRef = React.useRef(() => {})
  
  const mainButtonIsMounted = useSignal(mainButton.isMounted)
  const secondaryButtonIsMounted = useSignal(secondaryButton.isMounted)
  const backButtonIsMounted = useSignal(backButton.isMounted)
  const settingsButtonIsMounted = useSignal(settingsButton.isMounted)
  const closingBehaviorIsMounted = useSignal(closingBehavior.isMounted)
  const swipeBehaviorIsMounted = useSignal(swipeBehavior.isMounted)
  const viewportIsMounted = useSignal(viewport.isMounted)
  const miniAppIsMounted = useSignal(miniApp.isMounted)

  const backButtonIsSupported = useSignal(backButton.isSupported)
  const settingsButtonIsSupported = useSignal(settingsButton.isSupported)
  const swipeBehaviorIsSupported = useSignal(swipeBehavior.isSupported)
  const miniAppIsSupported = useSignal(miniApp.isSupported)
  
  useEffect(() => {
    if (!closingBehaviorIsMounted) {
      return
    }

    if (closeConfirmation) {
      closingBehavior.enableConfirmation()
    } else {
      closingBehavior.disableConfirmation()
    }
  }, [closeConfirmation, closingBehaviorIsMounted])

  useEffect(() => {
    if (!swipeBehaviorIsMounted || (!swipeBehaviorIsSupported && silentErrors)) {
      return
    }

    if (allowSwipeExpand) {
      swipeBehavior.enableVertical()
    } else {
      swipeBehavior.disableVertical()
    }
  }, [allowSwipeExpand, swipeBehaviorIsMounted, silentErrors])

  useEffect(() => {
    if (!viewportIsMounted) {
      return
    }

    if (autoExpand) {
      viewport.expand()
    }
  }, [autoExpand, viewportIsMounted])

  useEffect(() => {
    if (!backButtonIsMounted || (!backButtonIsSupported && silentErrors)) {
      return
    }

    if (onBack) {
      backButton.show();
      const offHandler = backButton.onClick(onBack);
      backButtonOffHandlerRef.current = offHandler
      return offHandler
    }
    backButton.hide();
  }, [onBack, backButtonIsMounted, silentErrors]);

  useEffect(() => {
    if (!mainButtonIsMounted) {
      return
    }

    if (mainButtonProps) {
      const { onClick, ...restProps } = mainButtonProps
      mainButton.setParams({
        ...defaultMainButtonProps,
        ...restProps,
        isVisible: true,
      })
      const offHandler = mainButton.onClick(onClick);
      mainButtonOffHandlerRef.current = offHandler
      return offHandler
    }
    if (mainButton.isVisible()) {
      mainButton.setParams({
        isVisible: false
      })
    }
  }, [mainButtonProps, mainButtonIsMounted]);

  useEffect(() => {
    if (!secondaryButtonIsMounted) {
      return
    }

    if (secondaryButtonProps) {
      const { onClick, ...restProps } = secondaryButtonProps
      secondaryButton.setParams({
        ...defaultSecondaryButtonProps,
        ...restProps,
        isVisible: true,
      })
      const offHandler = secondaryButton.onClick(onClick);
      secondaryButtonOffHandlerRef.current = offHandler
      return offHandler
    }
    if (secondaryButton.isVisible()) {
      secondaryButton.setParams({
        isVisible: false,
      })
    }
  }, [secondaryButtonProps, secondaryButtonIsMounted]);

  useEffect(() => {
    if (!settingsButtonIsMounted || (!settingsButtonIsSupported && silentErrors)) {
      return
    }

    if (onSettings) {
      settingsButton.show();
      const offHandler = settingsButton.onClick(onSettings);
      settingsButtonOffHandlerRef.current = offHandler
      return offHandler
    }
    settingsButton.hide();
  }, [onSettings, settingsButtonIsMounted, silentErrors]);

  useEffect(() => {
    if(!miniAppIsMounted || (!miniAppIsSupported && silentErrors)) {
      return
    }

    miniApp.setBackgroundColor((backgroundColor || 'bg_color') as any)
  }, [miniAppIsMounted, backgroundColor, silentErrors])

  useEffect(() => {
    if(!miniAppIsMounted || (!miniAppIsSupported && silentErrors)) {
      return
    }

    miniApp.setHeaderColor((headerColor || 'bg_color') as any)
  }, [miniAppIsMounted, headerColor, silentErrors])

  useEffect(() => {
    if(!miniAppIsMounted || (!miniAppIsSupported && silentErrors)) {
      return
    }

    miniApp.setBottomBarColor((bottomBarColor || 'bottom_bar_bg_color') as any)
  }, [miniAppIsMounted, bottomBarColor, silentErrors])

  useEffect(() => {
    return () => {
      backButtonOffHandlerRef.current()
      mainButtonOffHandlerRef.current()
      secondaryButtonOffHandlerRef.current()
      settingsButtonOffHandlerRef.current()
      
      if(backButton.isMounted() && backButton.isSupported()) {
        backButton.hide()
      }

      if(mainButton.isMounted() && mainButton.isVisible()) {
        mainButton.setParams({
          ...defaultMainButtonProps,
          isVisible: false
        })
      }

      if(secondaryButton.isMounted() && secondaryButton.isVisible()) {
        secondaryButton.setParams({
          ...defaultSecondaryButtonProps,
          isVisible: false,
        })
      }

      if(settingsButton.isMounted() && settingsButton.isSupported()) {
        settingsButton.hide()
      }

      if(closingBehavior.isMounted()) {
        closingBehavior.disableConfirmation()
      }

      if(swipeBehavior.isMounted() && swipeBehavior.isSupported()) {
        swipeBehavior.disableVertical()
      }

      if(miniApp.isMounted() && miniApp.isSupported()) {
        if(backgroundColor) {
          miniApp.setBackgroundColor('bg_color')
        }
        if(headerColor) {
          miniApp.setHeaderColor('bg_color')
        }
        if(bottomBarColor) {
          miniApp.setBottomBarColor('bottom_bar_bg_color')
        }
      }
    }
  }, [])

  return <>{children}</>;
}
