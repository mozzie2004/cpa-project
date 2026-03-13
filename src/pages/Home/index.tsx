import Button from '@components/Button/Button';

export const HomePage = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '50px'
      }}
    >
      <h1>Home page</h1>
      <Button label="Join to us" />
    </div>
  );
};
