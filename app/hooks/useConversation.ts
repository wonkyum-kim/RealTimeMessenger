// useParams is a Client Component hook that lets you read a route's dynamic params filled in by the current URL.
//
// Route -> /shop/[tag]/[item]
// URL -> /shop/shoes/nike-air-max-97
// `params` -> { tag: 'shoes', item: 'nike-air-max-97' }
//
// https://nextjs.org/docs/app/api-reference/functions/use-params

import { useParams } from 'next/navigation';
import { useMemo } from 'react';

export default function useConversation() {
  const params = useParams();

  const conversationId = useMemo(() => {
    if (!params?.conversationId) {
      return '';
    }

    return params.conversationId as string;
  }, [params?.conversationId]);

  // !!는 boolean으로 타입 변환하게 해줌
  const isOpen = useMemo(() => !!conversationId, [conversationId]);

  return useMemo(
    () => ({
      isOpen,
      conversationId,
    }),
    [isOpen, conversationId]
  );
}
