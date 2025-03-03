import Link from 'next/link';

export default function Home() {
  return (
    <div className="container">
      <h1>Selamat Datang di Aplikasi Catur Online</h1>
      <p>Bermain catur secara realtime melawan pemain lain.</p>
      
      <div className="buttons">
        <Link href="/chess">
          <a className="button">Mulai Bermain</a>
        </Link>
      </div>
      
      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100vh;
          text-align: center;
          padding: 0 20px;
        }
        
        h1 {
          color: #333;
          margin-bottom: 20px;
        }
        
        .buttons {
          margin-top: 30px;
        }
        
        .button {
          background-color: #4d4d4d;
          color: white;
          padding: 12px 24px;
          border-radius: 4px;
          text-decoration: none;
          font-weight: bold;
          font-size: 18px;
          transition: background-color 0.3s;
        }
        
        .button:hover {
          background-color: #333;
        }
      `}</style>
    </div>
  );
}
