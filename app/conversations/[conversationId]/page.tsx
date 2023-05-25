import getConversationById from '@/app/actions/getConversationById';
import getMessages from '@/app/actions/getMessages';
import Header from './components/Header';
import Body from './components/Body';
import Form from './components/Form';
import EmptyState from '@/app/components/EmptyState';

interface IParams {
  conversationId: string;
}

export default async function ConversationId({ params }: { params: IParams }) {
  const conversation = await getConversationById(params.conversationId);
  const messages = await getMessages(params.conversationId);

  const Chat = (
    <>
      <Header conversation={conversation!} />
      <Body initialMessages={messages} />
      <Form />
    </>
  );

  return (
    <div className='lg:pl-80 h-full'>
      <div className='h-full flex flex-col'>
        {conversation ? Chat : <EmptyState />}
      </div>
    </div>
  );
}
