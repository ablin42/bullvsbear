export default function Custom500() {
  return (
    <div
      style={{
        fontFamily: '-apple-system, BlinkMacSystemFont, Roboto',
        height: '100vh',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#e8e6e3',
        backgroundcolor: '#181a1b',
      }}
      undefined
    >
      <div>
        <h1
          style={{
            display: 'inline-block',
            borderRight: '1px solid rgba(0, 0, 0, 0.3)',
            margin: '0px 20px 0px 0px',
            padding: ' 10px 23px 10px 0px',
            fontSize: '24px',
            fontWeight: 500,
            verticalAlign: 'top',
          }}
        >
          500
        </h1>
        <div
          style={{
            display: 'inline-block',
            textAlign: 'left',
            lineHeight: '49px',
            height: '49px',
            verticalAlign: 'middle',
          }}
        >
          <h2 style={{ fontSize: '14px', fontWeight: 'normal', lineHeight: 'inherit', margin: 0, padding: 0 }}>
            Internal Server Error 😭
          </h2>
        </div>
      </div>
      <div>
        <h4>An error occured while trying to fetch data from our servers, please try again later</h4>
      </div>
    </div>
  );
}
