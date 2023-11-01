import { AuthServiceProvider } from '@/providers/auth-service.provider';
import { QuestServiceProvider } from '@/providers/quest-service.provider';
import { RewardServiceProvider } from '@/providers/reward-service.provider';

export default function ServicesProvider({ children }: { children: React.ReactNode }) {
  return (
    <AuthServiceProvider>
      <QuestServiceProvider>
        <RewardServiceProvider>
          { children }
        </RewardServiceProvider>
      </QuestServiceProvider>
    </AuthServiceProvider>
  );
}