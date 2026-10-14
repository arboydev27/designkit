"use client";
import ExampleCanvas from '../shared/ExampleCanvas';
import { example } from './example';
import { recipe } from './recipe';
import type { PlaygroundSettings } from '../shared/types';
import '../shared/kit.css';
import '../shared/fonts.css';
export default function ExampleApp({ settings = {} }: { settings?: Partial<PlaygroundSettings> }) { return <div style={{containerType:"inline-size"}}><ExampleCanvas example={example} recipe={recipe} settings={settings} /></div>; }
