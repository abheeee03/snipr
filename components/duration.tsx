import React from 'react';

export default function Duration({ className, seconds, fromMilliseconds = false }: { className?: string; seconds: number; fromMilliseconds?: boolean }) {
  const totalSeconds = fromMilliseconds ? seconds / 1000 : seconds;
  return (
    <time dateTime={`P${Math.round(totalSeconds)}S`} className={className}>
      {format(totalSeconds)}
    </time>
  );
}

function format(seconds: number) {
  const total = Math.max(0, seconds);
  const hh = Math.floor(total / 3600);
  const mm = Math.floor((total % 3600) / 60);
  const ss = Math.floor(total % 60);
  if (hh) {
    return `${pad(hh)}:${pad(mm)}:${pad(ss)}`;
  }
  return `${pad(mm)}:${pad(ss)}`;
}

function pad(string: string | number) {
  return (`0${string}`).slice(-2);
}