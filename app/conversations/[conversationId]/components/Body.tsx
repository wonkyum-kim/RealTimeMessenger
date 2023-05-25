'use client';

import axios from 'axios';
import useConversation from '@/app/hooks/useConversation';
import { useEffect, useRef, useState } from 'react';
import { FullMessageType } from '@/app/types';

interface BodyProps {
  initialMessages: FullMessageType[];
}

export default function Body({ initialMessages }: BodyProps) {
  return <div className='flex-1 overflow-y-auto'></div>;
}
