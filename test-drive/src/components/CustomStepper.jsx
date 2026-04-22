import { Stepper, Step, StepLabel } from '@mui/material';
import { styled } from '@mui/material/styles';

// ======================
// ICON
// ======================
const Circle = styled('div')(({ ownerState }) => ({
  width: 32,
  height: 32,
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: 17,
  fontWeight: 600,

  backgroundColor: ownerState.active || ownerState.completed ? '#00aad2' : '#c1c1c1',

  color: '#fff',
}));

function StepIcon(props) {
  const { active, completed, icon } = props;

  return <Circle ownerState={{ active, completed }}>{icon}</Circle>;
}

// ======================
// STEPTER
// ======================
export default function CustomStepper({ step, steps }) {
  return (
    <div
      style={{
        width: '100vw',
        marginLeft: 'calc(50% - 50vw)',
        background: '#f6f3f2',
        padding: '10px 0',
        marginTop: '40px',
        marginBottom: '60px',
      }}
    >
      <Stepper
        activeStep={step}
        sx={{
          maxWidth: 1120,
          margin: '20px auto',
        }}
      >
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel
              slots={{
                stepIcon: StepIcon, // ✔ ВАЖЛИВО: тільки slots
              }}
              sx={{
                '& .MuiStepLabel-label': {
                  color: '#c1c1c1',
                  fontWeight: 500,
                },
                '& .MuiStepLabel-label.Mui-active': {
                  color: '#00aad2',
                  fontWeight: 600,
                },
                '& .MuiStepLabel-label.Mui-completed': {
                  color: '#00aad2',
                  fontWeight: 600,
                },
              }}
            >
              {label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  );
}
