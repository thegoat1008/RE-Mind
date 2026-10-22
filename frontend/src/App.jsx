import { useState } from 'react'

function App() {
  const [apiMessage, setApiMessage] = useState('아직 백엔드에 연결하지 않았어요.')
  const [isLoading, setIsLoading] = useState(false)

  async function checkApi() {
    setIsLoading(true)
    try {
      const response = await fetch('/api/health')
      if (!response.ok) throw new Error('API 응답 오류')
      const data = await response.json()
      setApiMessage(data.message)
    } catch {
      setApiMessage('연결에 실패했어요. Spring Boot 서버가 실행 중인지 확인해 주세요.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="page">
      <section className="card">
        <p className="eyebrow">SPRING BOOT · REACT</p>
        <h1>RE-mind</h1>
        <p className="intro">웹앱 개발을 시작할 준비가 됐어요.</p>
        <div className="connection">
          <span className="connection-label">백엔드 연결 상태</span>
          <p role="status">{apiMessage}</p>
          <button onClick={checkApi} disabled={isLoading}>
            {isLoading ? '확인 중…' : 'API 연결 확인'}
          </button>
        </div>
      </section>
    </main>
  )
}

export default App
