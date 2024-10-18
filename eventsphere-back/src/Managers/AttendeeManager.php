<?php

namespace App\Managers;

use App\Entity\Attendees;
use App\Entity\Event;
use App\Entity\Users;
use Doctrine\ORM\EntityManagerInterface;
use Exception;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

class AttendeeManager extends AbstractController
{
    private EntityManagerInterface $entityManager;

    public function __Construct(
        EntityManagerInterface      $entityManager
    ) {
        $this->entityManager = $entityManager;
    }
    public function manageAttendees($request) {

        if ($request['type'] == 'event') {

            return $this->eventAttendees($request);
        } else {

            return $this->meetupAttendees($request);
        }
    }

    public function eventAttendees($request): JsonResponse
    {

        $attendee = new Attendees();
        $event = $this->entityManager->getRepository(Event::class)->findOneBy(['id' => $request['event_id']]);
        $user = $this->entityManager->getRepository(Users::class)->findOneBy(['id' => $request['user_id']]);



        if ($request['action'] == 'join') {

            try {
                $attendee->setEventId($event->getId())
                    ->setUserId($user->getId());

                $this->entityManager->persist($attendee);
                $this->entityManager->flush();
            } catch (\Exception $e) {
                $statusCode = $e->getCode() ?: Response::HTTP_INTERNAL_SERVER_ERROR;

                return new JsonResponse(['Message' => $e->getMessage()], $statusCode);
            }


            return new JsonResponse(['Message' => 'User successfully joined the event.'], 200);
        }

        if ($request['action'] == 'leave') {


                try {
                    $this->deleteAttendeeById($user->getId(), $event->getId());
                    return new JsonResponse(['Message' => 'User successfully left the event.'], 200);
                } catch (Exception $e) {
                    return new JsonResponse(['Message' => $e->getMessage()], $e->getCode() ?: Response::HTTP_INTERNAL_SERVER_ERROR);
                }


            return new JsonResponse(['Message' => 'User successfully leaved the event.'], 200);
        }

        return new JsonResponse(['Message' => 'Something went wrong.']);
    }

    public function meetupAttendees($request): JsonResponse
    {
        $attendee = new Attendees();

        if ($request->get['action'] == 'join') {
            try {
                $attendee->setEvent($request['meetup_id'])
                    ->setUser($request['user_id']);

                $this->entityManager->persist($attendee);
                $this->entityManager->flush();
            } catch (Exception $e) {

                return new JsonResponse(['Message' => $e->getMessage()], $e->getCode());
            }


            return new JsonResponse(['Message' => 'User successfully joined the meetup.'], 200);
        }

        if ($request->get['action'] == 'leave') {
            try {
                $this->deleteAttendeeById($request->get('user_id'));
            } catch (Exception $e) {

                return new JsonResponse(['Message' => $e->getMessage()], $e->getCode());
            }


            return new JsonResponse(['Message' => 'User successfully leaved the meetup.'], 200);
        }

        return new JsonResponse(['Message' => 'Something went wrong.']);
    }

    /**
     * @throws Exception
     */
    public function deleteAttendeeById(int $userId, int $eventId): void
    {
        $attendee = $this->entityManager->getRepository(Attendees::class)->findOneBy([
            'userId' => $userId,
            'eventId' => $eventId,
        ]);

        if ($attendee) {
            $this->entityManager->remove($attendee);
            $this->entityManager->flush();
        } else {
            throw new \Exception('Attendee not found');
        }
    }

}