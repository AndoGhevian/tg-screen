# tg-screen

**\<TGScreen\/\>** is a simple, declarative React Component designed to simplify bootstrapping the native functionality of Telegram **mini app screens** without deep diving into **non declarative** Telegram React SDK.

## Live Demo

Check out a live demo of the mini app: [@tg_screen_demo_bot](https://t.me/tg_screen_demo_bot).

You can find the complete codebase for the demo in [`examples/demo`](./examples/demo).

## Install

`npm install tg-screen`
> Note: This package requires @telegram-apps/sdk-react version ^2.0.0 or higher. If it's not already installed, you can add it using:
`npm install @telegram-apps/sdk-react@^2.0.0`

## Usage

Here's a quick example to get you started:

```typescript
import { TgScreen } from 'tg-screen'

function App() {
  const colors = {
    headerColor: "#404c9e", // violet
    backgroundColor: "#ffffff", // white
    bottomBarColor: "#d3b92f", // yellow
  }

  return (
    <TgScreen
      headerColor={colors.headerColor}
      backgroundColor={colors.backgroundColor}
      bottomBarColor={colors.bottomBarColor}
      allowSwipeExpand={true}
      autoExpand={true}
      closeConfirmation={true}
      onSettings={() => alert("Settings")}
      onBack={() => alert("Back")}
      mainButtonProps={{
        onClick: () => alert("main button clicked"),
      }}
      secondaryButtonProps={{
        onClick: () => alert("secondary button clicked"),
      }}
    >
      <p style={{color: "#ffffff"}}>Hello World!</p>
    </TgScreen>
  )
}

export default App
```

##  TypeScript Support

The package comes with TypeScript documentation, so you can benefit from type safety and IntelliSense. The API is designed to be simple and intuitive, making it easy to get started.

## Issues

Encountered a bug or have a feature request? Please let me know by [opening an issue](https://github.com/AndoGhevian/tg-screen/issues). Your feedback is greatly appreciated and helps me improve the library!

## License

This project is licensed under the MIT License.
