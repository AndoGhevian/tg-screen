import { useEffect, useState } from 'react'
import { TgScreen } from 'tg-screen'
import { Colors } from './colors';
import { randomPhrase } from './randomPhrase';
import { useRandomPhrase } from "./hooks/useRandomPhrase"

function App() {
  const phrase = useRandomPhrase()
  const [showSecondary, setShowSecondary] = useState(false)

  const [shine, setShine] = useState(false)
  const [loading, setLoading] = useState(true)
  const [colors, setColors] = useState({
    headerColor: Colors.Violet as `#${string}` | undefined,
    backgroundColor: Colors.Green as `#${string}` | undefined,
    bottomBarColor: Colors.Yellow as `#${string}` | undefined,
  })

  let mainBtnText = "Make Shine"
  if (shine) {
    mainBtnText = "Mute Shine"
  }
  if (loading) {
    mainBtnText = "Finish Loading"
  }

  const content = (
    <div style={{
      height: "100vh",
      background: "url(/christmas.webp)",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
    }}>
      <p style={{
        paddingTop: "50px",
        color: Colors.Red,
        fontWeight: "bold",
        textAlign: "center",
      }}>{"<"}Tg Screen Demo{" />"}</p>
    </div>
  )

  useEffect(() => {
    const headerColorInterval = setInterval(() => {
      setColors(prev => ({
        ...prev,
        headerColor: !prev.headerColor ? Colors.Violet : undefined,
      }))
    }, 1800)

    const bottomBarColorInterval = setInterval(() => {
      setColors(prev => ({
        ...prev,
        bottomBarColor: prev.bottomBarColor === Colors.Violet
          ? Colors.Yellow
          : Colors.Violet,
      }))
    }, 600)

    const backgroundColorInterval = setInterval(() => {
      setColors(prev => ({
        ...prev,
        backgroundColor: prev.backgroundColor === Colors.White
          ? Colors.Green
          : Colors.White,
      }))
    }, 300)

    const showSecondaryInterval = setInterval(() => {
      setShowSecondary(prev => !prev)
    }, 2300)

    return () => {
      clearInterval(headerColorInterval)
      clearInterval(bottomBarColorInterval)
      clearInterval(backgroundColorInterval)
      clearInterval(showSecondaryInterval)
    }
  }, [])

  return (
    <TgScreen
      headerColor={colors.headerColor}
      backgroundColor={colors.backgroundColor}
      bottomBarColor={colors.bottomBarColor}
      onSettings={() => {
        alert(randomPhrase())
      }}
      onBack={() => {
        alert("Back")
      }}
      mainButtonProps={{
        onClick: () => {
          if (loading) {
            setLoading(false)
            setShine(true)
            return
          }
          setShine(prev => !prev)
        },
        text: mainBtnText,
        isEnabled: true,
        textColor: loading
          ? Colors.White
          : shine
            ? Colors.Black
            : Colors.White,
        backgroundColor: loading
          ? Colors.Seablue
          : Colors.Pink,
        hasShineEffect: shine,
      }}
      secondaryButtonProps={(
        showSecondary
          ? {
            onClick: () => {
              alert(phrase)
            },
            position: "right",
          }
          : undefined
      )}
    >
      {content}
    </TgScreen>
  )
}

export default App
