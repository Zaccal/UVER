import { Rating } from '@kolking/react-native-rating'
import { institutionContext } from "@/components/institutionsCard/institution-context";
import { View } from 'react-native';

export function InstitutionsCardRating() {
  const rating = institutionContext.useSelect(state => state.rating)

  return (
    <View className='my-3'>
      <Rating rating={rating ?? 0} size={17} variant='stars-outline' />
    </View>
  );
}
