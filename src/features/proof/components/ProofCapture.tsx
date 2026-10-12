import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, Image, Alert } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { Button } from '@/components';
import { proofRepo } from '@/services/mock/ProofRepo';
import { colors, spacing } from '@/theme/tokens';

interface ProofCaptureProps {
  assignmentId: string;
  onSuccess: () => void;
  onCancel: () => void;
}

export const ProofCapture: React.FC<ProofCaptureProps> = ({ assignmentId, onSuccess, onCancel }) => {
  const [permission, requestPermission] = useCameraPermissions();
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const cameraRef = useRef<CameraView>(null);

  if (!permission) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.text}>Requesting camera permission...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.text}>We need your permission to use the camera</Text>
        <Button title="Grant Permission" onPress={requestPermission} />
        <View style={styles.spacer} />
        <Button title="Cancel" variant="secondary" onPress={onCancel} />
      </View>
    );
  }

  const takePicture = async () => {
    if (!cameraRef.current) return;
    try {
      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.5,
      });
      if (photo && photo.uri) {
        setPhotoUri(photo.uri);
      }
    } catch (e) {
      console.error('Failed to take picture', e);
      Alert.alert('Error', 'Failed to take picture. Please try again.');
    }
  };

  const submitProof = async () => {
    if (!photoUri) return;
    setIsSubmitting(true);
    try {
      await proofRepo.submitProof({
        assignmentId,
        photoUrl: photoUri,
        timestamp: new Date(),
      });
      onSuccess();
    } catch (e) {
      console.error('Failed to submit proof', e);
      Alert.alert('Error', 'Failed to submit proof. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (photoUri) {
    return (
      <View style={styles.container}>
        <Image source={{ uri: photoUri }} style={styles.preview} resizeMode="contain" />
        <View style={styles.actionContainer}>
          <Button title="Retake" variant="secondary" onPress={() => setPhotoUri(null)} disabled={isSubmitting} />
          <Button title="Submit Proof" onPress={submitProof} isLoading={isSubmitting} />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing="back" ref={cameraRef}>
        <View style={styles.cameraOverlay}>
          <View style={styles.cameraActions}>
            <Button title="Cancel" variant="secondary" onPress={onCancel} />
            <Button title="Take Picture" onPress={takePicture} />
          </View>
        </View>
      </CameraView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
    backgroundColor: colors.background,
  },
  text: {
    fontSize: 16,
    color: colors.text,
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  spacer: {
    height: spacing.sm,
  },
  camera: {
    flex: 1,
  },
  cameraOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: spacing.lg,
    paddingBottom: spacing.xl,
  },
  cameraActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  preview: {
    flex: 1,
    width: '100%',
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: spacing.lg,
    backgroundColor: colors.background,
  },
});
