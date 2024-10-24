import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

type RepSliderProps = {
  reps: number;
  onRepsChange: (value: number) => void;
};

export const RepSlider = ({ reps, onRepsChange }: RepSliderProps) => {
  return (
    <>
      <Slider
        defaultValue={[reps]}
        min={1}
        max={15}
        step={1}
        onValueChange={(value) => {
          onRepsChange(value[0]);
        }}
        className='w-full'
      />
      <p className='text-4xl font-semibold'>
        {reps} {reps === 1 ? 'rep' : 'reps'}
      </p>
    </>
  );
};

export const OneRepMaxCalculator = () => {
  const [weight, setWeight] = useState(0);
  const [reps, setReps] = useState(1);
  const [oneRepMax, setOneRepMax] = useState<number>();
  const [resultView, setResultView] = useState(false);

  const weightZeroOrBelow = !validateWeight(weight);

  if (resultView) {
    return (
      <ResultView oneRepMax={oneRepMax || 0} handleClick={setResultView} />
    );
  }

  return (
    <Card className='w-96 h-96'>
      <CardHeader>
        <CardTitle>1RM Calculator</CardTitle>
        <CardDescription>Figure out your one rep max</CardDescription>
      </CardHeader>
      <CardContent className='flex flex-col gap-y-8'>
        <Input
          type='number'
          placeholder='Weight lifted in lbs'
          onChange={(event) => {
            setWeight(Number(event.target.value));
          }}
        />
        <RepSlider reps={reps} onRepsChange={setReps} />
      </CardContent>
      <CardFooter>
        <Button
          onClick={() => {
            setOneRepMax(calculate1RM(weight, reps));
            setResultView(true);
          }}
          disabled={weightZeroOrBelow}
        >
          {weightZeroOrBelow ? 'Enter a valid weight' : 'Calculate 1RM'}
        </Button>
      </CardFooter>
    </Card>
  );
};

type ResultViewProps = {
  oneRepMax: number;
  handleClick: (view: boolean) => void;
};

function ResultView({ oneRepMax, handleClick }: ResultViewProps) {
  return (
    <Card className='w-96 h-96'>
      <CardHeader>
        <CardTitle>1RM Calculator</CardTitle>
        <CardDescription>Figure out your one rep max</CardDescription>
      </CardHeader>
      <CardContent className='flex flex-col gap-y-8'>
        <p className='text-3xl font-semibold'>Your 1RM is</p>
        <p className='text-6xl font-bold'>{oneRepMax} lbs.</p>
      </CardContent>
      <CardFooter>
        <Button onClick={() => handleClick(false)}>
          Go back to calculator
        </Button>
      </CardFooter>
    </Card>
  );
}

function validateWeight(weight: number) {
  return !!weight || weight > 0;
}

function calculate1RM(weight: number, reps: number) {
  if (reps === 1) {
    return weight;
  }

  return roundToNearestFive(weight * reps * 0.03333 + weight);
}

function roundToNearestFive(value: number) {
  return Math.round(value / 5) * 5;
}
