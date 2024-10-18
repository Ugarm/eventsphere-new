<?php

namespace App\Controller\API;

use App\Managers\AttendeeManager;
use App\Managers\EventManager;
use Exception;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;

class EventController extends AbstractController
{
    private AttendeeManager $attendeeManager;
    private EventManager $eventManager;

    public function __Construct(
        EventManager          $eventManager,
        AttendeeManager       $attendeeManager
    ) {
        $this->eventManager = $eventManager;
        $this->attendeeManager = $attendeeManager;
    }

    /**
     * @throws Exception
     */
    #[Route('/api/events', name: 'app_event')]
    public function createEvent(Request $request): JsonResponse
    {
        try {
            $response = $this->eventManager->createEvent($request);
        } catch (\Exception $e) {
            return new JsonResponse([
                'code' => $e->getCode(),
                'message' => $e->getMessage()
            ]);
        }

        return $response;
    }

    #[Route('/api/event_feedbacks', name: 'app_event_feedback')]
    public function addEventFeedback(Request $request) {

    }

    #[Route('/api/event_attendees', name: 'app_event_attendees')]
    public function addEventAttendee(Request $request): JsonResponse {

        $data = json_decode($request->getContent(), true);

        try {
            $this->attendeeManager->manageAttendees($data);

        } catch (Exception $e) {

            return new JsonResponse([
                'Message' => $e->getMessage(),
                'Code' => $e->getCode()
            ]);
        }

        return $this->attendeeManager->manageAttendees($data);
    }
}
