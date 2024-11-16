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
  closeConfirmation?: boolean;
  autoExpand?: boolean;
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
  bottomBarColor?: string
}>) {
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
    if (!swipeBehaviorIsMounted || !swipeBehaviorIsSupported) {
      return
    }

    if (allowSwipeExpand) {
      swipeBehavior.enableVertical()
    } else {
      swipeBehavior.disableVertical()
    }
  }, [allowSwipeExpand, swipeBehaviorIsMounted])

  useEffect(() => {
    if (!viewportIsMounted) {
      return
    }

    if (autoExpand) {
      viewport.expand()
    }
  }, [autoExpand, viewportIsMounted])

  useEffect(() => {
    if (!backButtonIsMounted || !backButtonIsSupported) {
      return
    }

    if (onBack) {
      backButton.show();
      return backButton.onClick(onBack);
    }
    backButton.hide();
  }, [onBack, backButtonIsMounted]);

  useEffect(() => {
    if (!mainButtonIsMounted) {
      return
    }

    if (mainButtonProps) {
      const { onClick, ...restProps } = mainButtonProps
      mainButton.setParams({
        ...restProps,
        isVisible: true,
      })
      return mainButton.onClick(onClick);
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
        ...restProps,
        isVisible: true,
      })
      return secondaryButton.onClick(onClick);
    }
    if (secondaryButton.isVisible()) {
      secondaryButton.setParams({
        isVisible: false,
      })
    }
  }, [secondaryButtonProps, secondaryButtonIsMounted]);

  useEffect(() => {
    if (!settingsButtonIsMounted || !settingsButtonIsSupported) {
      return
    }

    if (onSettings) {
      settingsButton.show();
      return settingsButton.onClick(onSettings);
    }
    settingsButton.hide();
  }, [onSettings, settingsButtonIsMounted]);

  useEffect(() => {
    if(!miniAppIsMounted || !miniAppIsSupported) {
      return
    }

    if(backgroundColor) {
      miniApp.setBackgroundColor(backgroundColor as any)
    }
  }, [backgroundColor])

  useEffect(() => {
    if(!miniAppIsMounted || !miniAppIsSupported) {
      return
    }

    if(headerColor) {
      miniApp.setHeaderColor(headerColor as any)
    }
  }, [headerColor])

  useEffect(() => {
    if(!miniAppIsMounted || !miniAppIsSupported) {
      return
    }

    if(bottomBarColor) {
      miniApp.setBottomBarColor(bottomBarColor as any)
    }
  }, [bottomBarColor])

  return <>{children}</>;
}
