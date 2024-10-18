<?php

namespace App\Controller\API;

use Exception;
use App\Managers\MeetupManager;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class MeetupController extends AbstractController
{
    private MeetupManager $meetupManager;

    public function __Construct(
        MeetupManager          $meetupManager,
    ) {
        $this->meetupManager = $meetupManager;
    }

    /**
     * @throws Exception
     */
    #[Route('/api/meetup', name: 'app_meetup', methods: ['POST'])]
    public function newMeetup(Request $request): JsonResponse
    {
        // Execute meetup creation method
        try {
            $response = $this->meetupManager->createMeetup($request);
        } catch (\Exception $e) {
            return new JsonResponse([
                'code' => $e->getCode(),
                'message' => $e->getMessage()
            ]);
        }

        return $response;
    }

}
